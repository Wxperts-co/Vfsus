const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

const uri = 'mongodb://virginia:VirginiaSecurity26@104.247.77.42/vsf';

function saveBase64ToFile(dataUri, folder, prefix) {
  if (!dataUri || !dataUri.startsWith('data:')) return dataUri;

  const matches = dataUri.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  if (!matches || matches.length !== 3) return dataUri;

  const mime = matches[1];
  const base64Data = matches[2];
  const buffer = Buffer.from(base64Data, 'base64');

  let ext = '.jpg';
  if (mime.includes('png')) ext = '.png';
  else if (mime.includes('webp')) ext = '.webp';
  else if (mime.includes('svg')) ext = '.svg';

  const filename = `${prefix}-${Date.now()}${ext}`;
  const targetDir = path.join(process.cwd(), 'public', 'uploads', folder);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const filePath = path.join(targetDir, filename);
  fs.writeFileSync(filePath, buffer);
  console.log(`Saved: ${filePath} (${buffer.length} bytes)`);

  return `/uploads/${folder}/${filename}`;
}

(async () => {
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db();

  // 1. global_settings
  const globalSettings = await db.collection('settings').findOne({ _id: 'global_settings' });
  if (globalSettings && globalSettings.logoUrl && globalSettings.logoUrl.startsWith('data:')) {
    const newLogoUrl = saveBase64ToFile(globalSettings.logoUrl, 'logos', 'logo-migrated');
    await db.collection('settings').updateOne(
      { _id: 'global_settings' },
      { $set: { logoUrl: newLogoUrl } }
    );
    console.log('Migrated global_settings.logoUrl ->', newLogoUrl);
  }

  // 2. page_home
  const pageHome = await db.collection('settings').findOne({ _id: 'page_home' });
  if (pageHome) {
    const update = {};
    if (pageHome.aboutSection?.image?.startsWith('data:')) {
      update['aboutSection.image'] = saveBase64ToFile(pageHome.aboutSection.image, 'home', 'about-migrated');
    }
    if (pageHome.whyChooseUsSection?.rightImage?.startsWith('data:')) {
      update['whyChooseUsSection.rightImage'] = saveBase64ToFile(pageHome.whyChooseUsSection.rightImage, 'home', 'whychoose-migrated');
    }
    if (pageHome.whyChooseUsSection?.backgroundImage === '/images/american-flag.jpg') {
      update['whyChooseUsSection.backgroundImage'] = '/images/about-bg-section.webp';
    }
    if (Object.keys(update).length > 0) {
      await db.collection('settings').updateOne(
        { _id: 'page_home' },
        { $set: update }
      );
      console.log('Migrated page_home fields:', Object.keys(update));
    }
  }

  // 3. page_services
  const pageServices = await db.collection('settings').findOne({ _id: 'page_services' });
  if (pageServices && Array.isArray(pageServices.services)) {
    let modified = false;
    const services = pageServices.services.map((service, idx) => {
      if (service.image && service.image.startsWith('data:')) {
        const slug = service.slug || `service-${idx + 1}`;
        const newImage = saveBase64ToFile(service.image, 'services', `service-${slug}`);
        modified = true;
        return { ...service, image: newImage };
      }
      return service;
    });

    if (modified) {
      await db.collection('settings').updateOne(
        { _id: 'page_services' },
        { $set: { services } }
      );
      console.log('Migrated all base64 services in page_services');
    }
  }

  console.log('All migrations completed successfully!');
  await client.close();
})();
