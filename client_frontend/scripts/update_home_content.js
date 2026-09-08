const { MongoClient } = require('mongodb');

const uri = 'mongodb://virginia:VirginiaSecurity26@104.247.77.42/vsf';

const newIndustries = [
  { id: 1, icon: '/images/industry-icon6.svg', title: 'Government & Diplomatic Facilities', description: 'Trusted protection for sensitive facilities and personnel.', delay: '100', column: 1 },
  { id: 2, icon: '/images/industry-icon5.svg', title: 'Hospitals & Healthcare Facilities', description: 'Protecting patients, staff, visitors, and property.', delay: '200', column: 1 },
  { id: 3, icon: '/images/industry-icon1.svg', title: 'Corporate Offices', description: 'Security for people, property, and operations.', delay: '300', column: 1 },
  { id: 4, icon: '/images/industry-icon4.svg', title: 'Hotels & Resorts', description: 'Protecting guests, staff, and property', delay: '400', column: 2 },
  { id: 5, icon: '/images/industry-icon-warehouse.svg', title: 'Warehouses & Industrial Facilities', description: 'Securing assets, facilities, and operations.', delay: '500', column: 2 },
  { id: 6, icon: '/images/industry-icon2.svg', title: 'Shopping Centers, Malls & Retail Properties', description: 'Protecting customers, businesses, and assets.', delay: '600', column: 3 },
  { id: 7, icon: '/images/industry-icon-residential.svg', title: 'Residential, HOA & Gated Communities', description: 'Protecting residents. Securing property.', delay: '700', column: 3 }
];

(async () => {
  try {
    const client = new MongoClient(uri, { serverSelectionTimeoutMS: 8000 });
    await client.connect();
    const db = client.db();
    
    const result = await db.collection('settings').updateOne(
      { _id: 'page_home' },
      {
        $set: {
          'testimonialsSection.titlePart2': 'Satisfied Clients',
          'whyChooseUsSection.industries': newIndustries
        }
      }
    );
    console.log('MongoDB Update Result:', result);
    
    const updated = await db.collection('settings').findOne({ _id: 'page_home' });
    console.log('Updated testimonials titlePart2:', updated.testimonialsSection?.titlePart2);
    console.log('Updated industries count:', updated.whyChooseUsSection?.industries?.length);
    console.log('Updated industries:', updated.whyChooseUsSection?.industries);

    await client.close();
  } catch (err) {
    console.error('Error updating DB:', err);
  }
})();
