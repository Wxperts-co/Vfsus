const { MongoClient } = require('mongodb');

async function main() {
  const uri = 'mongodb://virginia:VirginiaSecurity26@104.247.77.42/vsf';
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db();

    // 1. Update page_home
    await db.collection('settings').updateOne(
      { _id: 'page_home' },
      {
        $set: {
          seo: {
            title: 'Security Services Washington, DC | Virginia Surveillance Force',
            description: 'Virginia Surveillance Force offers professional security services across Washington DC, Maryland, and Virginia. Get licensed armed and unarmed security guards—get a free quote today!',
            keywords: 'security services Virginia, security company Maryland, security services Washington DC, private security services Maryland, professional security services, licensed security guards Virginia, armed security services Virginia, armed security guards Maryland, unarmed security services Virginia, security services DC Maryland Virginia , Commercial security services Virginia, Residential security services Virginia, Corporate security services Virginia, Executive protection Virginia , 24/7 security services Virginia , Security patrol services Virginia, Fire watch services Virginia, Security guards Northern Virginia, security guards for hotels, security guards for hospitals ,security guards for schools, security guards for retail stores, security guards Alexandria VA, security services Manassas VA'
          }
        }
      }
    );
    console.log('Successfully updated page_home in DB');

    // 2. Verify global_settings
    const globalSettings = await db.collection('settings').findOne({ _id: 'global_settings' });
    console.log('global_settings seo title:', globalSettings?.seo?.title);

    // 3. Update all services in page_services with their SEO metadata
    const servicesPage = await db.collection('settings').findOne({ _id: 'page_services' });
    if (servicesPage && servicesPage.services) {
      const servicesSeoMap = {
        'concierge-and-frontdesk': {
          title: 'Concierge & Front-desk Washington DC | Virginia Surveillance Force',
          description: 'Virginia Surveillance Force provides professional front-desk concierge security services in Washington DC. Request a quote to secure your facility today.',
          keywords: 'security company Maryland, security services Washington DC, private security services Maryland, professional security services, licensed security guards Virginia, armed security services Virginia, armed security guards Maryland, unarmed security services Virginia, security services DC Maryland Virginia , Commercial security services Virginia, Residential security services Virginia, Corporate security services Virginia, Executive protection Virginia , 24/7 security services Virginia , Security patrol services Virginia, Fire watch services Virginia, Security guards Northern Virginia, security guards for hotels, security guards for hospitals ,security guards for schools, security guards for retail stores, security guards Alexandria VA, security services Manassas VA'
        },
        'fire-watch': {
          title: 'Fire Watch Services Maryland | Virginia Surveillance Force',
          description: 'Virginia Surveillance Force delivers professional fire watch services to keep Maryland properties safe and code-compliant. Request a quote today',
          keywords: 'security company Maryland, security services Washington DC, private security services Maryland, professional security services, licensed security guards Virginia, armed security services Virginia, armed security guards Maryland, unarmed security services Virginia, security services DC Maryland Virginia , Commercial security services Virginia, Residential security services Virginia, Corporate security services Virginia, Executive protection Virginia , 24/7 security services Virginia , Security patrol services Virginia, Fire watch services Virginia, Security guards Northern Virginia, security guards for hotels, security guards for hospitals ,security guards for schools, security guards for retail stores, security guards Alexandria VA, security services Manassas VA'
        },
        'vehicle-patrol': {
          title: 'Security Patrol Service Maryland | Virginia Surveillance Force',
          description: 'Virginia Surveillance Force provides reliable security patrol services to protect Maryland properties and ensure complete safety. Request a quote today!',
          keywords: 'security company Maryland, security services Washington DC, private security services Maryland, professional security services, licensed security guards Virginia, armed security services Virginia, armed security guards Maryland, unarmed security services Virginia, security services DC Maryland Virginia , Commercial security services Virginia, Residential security services Virginia, Corporate security services Virginia, Executive protection Virginia , 24/7 security services Virginia , Security patrol services Virginia, Fire watch services Virginia, Security guards Northern Virginia, security guards for hotels, security guards for hospitals ,security guards for schools, security guards for retail stores, security guards Alexandria VA, security services Manassas VA'
        },
        'permanent-or-temporary-security': {
          title: 'Armed & Unarmed Security Service Maryland | Virginia Surveillance Force',
          description: 'Virginia Surveillance Force provides licensed armed and unarmed security services to protect properties across Maryland. Request a quote today!',
          keywords: 'security company Maryland, security services Washington DC, private security services Maryland, professional security services, licensed security guards Virginia, armed security services Virginia, armed security guards Maryland, unarmed security services Virginia, security services DC Maryland Virginia , Commercial security services Virginia, Residential security services Virginia, Corporate security services Virginia, Executive protection Virginia , 24/7 security services Virginia , Security patrol services Virginia, Fire watch services Virginia, Security guards Northern Virginia, security guards for hotels, security guards for hospitals ,security guards for schools, security guards for retail stores, security guards Alexandria VA, security services Manassas VA'
        },
        'office-and-corporate-security': {
          title: 'Office & Corporate Security Maryland | Virginia Surveillance Force',
          description: 'Virginia Surveillance Force provides professional office and corporate security solutions to safeguard your business assets and personnel. Request a quote today!',
          keywords: 'security company Maryland, security services Washington DC, private security services Maryland, professional security services, licensed security guards Virginia, armed security services Virginia, armed security guards Maryland, unarmed security services Virginia, security services DC Maryland Virginia , Commercial security services Virginia, Residential security services Virginia, Corporate security services Virginia, Executive protection Virginia , 24/7 security services Virginia , Security patrol services Virginia, Fire watch services Virginia, Security guards Northern Virginia, security guards for hotels, security guards for hospitals ,security guards for schools, security guards for retail stores, security guards Alexandria VA, security services Manassas VA'
        },
        'malls-retail-shopping-centers-ware-houses-and-industrial-security': {
          title: 'Retail & Mall Security Maryland | Virginia Surveillance Force',
          description: 'Virginia Surveillance Force delivers professional retail and mall security solutions to safeguard Maryland businesses, staff, and shoppers. Request a quote today!',
          keywords: 'security company Maryland, security services Washington DC, private security services Maryland, professional security services, licensed security guards Virginia, armed security services Virginia, armed security guards Maryland, unarmed security services Virginia, security services DC Maryland Virginia , Commercial security services Virginia, Residential security services Virginia, Corporate security services Virginia, Executive protection Virginia , 24/7 security services Virginia , Security patrol services Virginia, Fire watch services Virginia, Security guards Northern Virginia, security guards for hotels, security guards for hospitals ,security guards for schools, security guards for retail stores, security guards Alexandria VA, security services Manassas VA'
        },
        'hotel-motel-and-resorts': {
          title: 'Hotel, Motel & Resorts Maryland | Virginia Surveillance Force',
          description: 'Virginia Surveillance Force delivers premier security solutions for hotels, motels, and resorts across Maryland and Washington DC. Request a quote today!',
          keywords: 'security company Maryland, security services Washington DC, private security services Maryland, professional security services, licensed security guards Virginia, armed security services Virginia, armed security guards Maryland, unarmed security services Virginia, security services DC Maryland Virginia , Commercial security services Virginia, Residential security services Virginia, Corporate security services Virginia, Executive protection Virginia , 24/7 security services Virginia , Security patrol services Virginia, Fire watch services Virginia, Security guards Northern Virginia, security guards for hotels, security guards for hospitals ,security guards for schools, security guards for retail stores, security guards Alexandria VA, security services Manassas VA'
        },
        'residential-and-gated-communities': {
          title: 'Residential & Gated Communities Maryland | Virginia Surveillance Force',
          description: 'Virginia Surveillance Force offers professional security services for residential properties and gated communities in Maryland and Washington DC. Request a quote today!',
          keywords: 'security company Maryland, security services Washington DC, private security services Maryland, professional security services, licensed security guards Virginia, armed security services Virginia, armed security guards Maryland, unarmed security services Virginia, security services DC Maryland Virginia , Commercial security services Virginia, Residential security services Virginia, Corporate security services Virginia, Executive protection Virginia , 24/7 security services Virginia , Security patrol services Virginia, Fire watch services Virginia, Security guards Northern Virginia, security guards for hotels, security guards for hospitals ,security guards for schools, security guards for retail stores, security guards Alexandria VA, security services Manassas VA'
        },
        'hospital-and-health-care-facilities': {
          title: 'Hospital & Health Care Security Maryland | Virginia Surveillance Force',
          description: 'Virginia Surveillance Force provides specialized hospital and healthcare security solutions to protect medical facilities in Maryland and Washington DC. Request a quote today!',
          keywords: 'security company Maryland, security services Washington DC, private security services Maryland, professional security services, licensed security guards Virginia, armed security services Virginia, armed security guards Maryland, unarmed security services Virginia, security services DC Maryland Virginia , Commercial security services Virginia, Residential security services Virginia, Corporate security services Virginia, Executive protection Virginia , 24/7 security services Virginia , Security patrol services Virginia, Fire watch services Virginia, Security guards Northern Virginia, security guards for hotels, security guards for hospitals ,security guards for schools, security guards for retail stores, security guards Alexandria VA, security services Manassas VA'
        },
        'schools-colleges-and-universities': {
          title: 'Schools Colleges & Universities Maryland | Virginia Surveillance Force',
          description: 'Virginia Surveillance Force provides specialized security solutions for schools, colleges, and universities across Maryland and Washington DC. Request a quote today!',
          keywords: 'security company Maryland, security services Washington DC, private security services Maryland, professional security services, licensed security guards Virginia, armed security services Virginia, armed security guards Maryland, unarmed security services Virginia, security services DC Maryland Virginia , Commercial security services Virginia, Residential security services Virginia, Corporate security services Virginia, Executive protection Virginia , 24/7 security services Virginia , Security patrol services Virginia, Fire watch services Virginia, Security guards Northern Virginia, security guards for hotels, security guards for hospitals ,security guards for schools, security guards for retail stores, security guards Alexandria VA, security services Manassas VA'
        },
        'government-and-diplomat-facilities': {
          title: 'Government & Diplomat Facilities Maryland | Virginia Surveillance Force',
          description: 'Virginia Surveillance Force provides specialized security solutions for government and diplomatic facilities in Maryland and Washington DC. Request a quote today!',
          keywords: 'security company Maryland, security services Washington DC, private security services Maryland, professional security services, licensed security guards Virginia, armed security services Virginia, armed security guards Maryland, unarmed security services Virginia, security services DC Maryland Virginia , Commercial security services Virginia, Residential security services Virginia, Corporate security services Virginia, Executive protection Virginia , 24/7 security services Virginia , Security patrol services Virginia, Fire watch services Virginia, Security guards Northern Virginia, security guards for hotels, security guards for hospitals ,security guards for schools, security guards for retail stores, security guards Alexandria VA, security services Manassas VA'
        },
        'alarm-response': {
          title: 'Alarm Response Services Maryland | Virginia Surveillance Force',
          description: 'Virginia Surveillance Force delivers rapid alarm response services across Maryland, Washington DC, and Virginia. Protect your assets—request a quote today',
          keywords: 'security company Maryland, security services Washington DC, private security services Maryland, professional security services, licensed security guards Virginia, armed security services Virginia, armed security guards Maryland, unarmed security services Virginia, security services DC Maryland Virginia , Commercial security services Virginia, Residential security services Virginia, Corporate security services Virginia, Executive protection Virginia , 24/7 security services Virginia , Security patrol services Virginia, Fire watch services Virginia, Security guards Northern Virginia, security guards for hotels, security guards for hospitals ,security guards for schools, security guards for retail stores, security guards Alexandria VA, security services Manassas VA'
        },
        'bank-security-and-atm-service': {
          title: 'Bank Security & ATM Service Maryland | Virginia Surveillance Force',
          description: 'Virginia Surveillance Force provides specialized bank security and ATM protection services across Maryland and Washington DC. Secure your financial assets—request a quote today!',
          keywords: 'security company Maryland, security services Washington DC, private security services Maryland, professional security services, licensed security guards Virginia, armed security services Virginia, armed security guards Maryland, unarmed security services Virginia, security services DC Maryland Virginia , Commercial security services Virginia, Residential security services Virginia, Corporate security services Virginia, Executive protection Virginia , 24/7 security services Virginia , Security patrol services Virginia, Fire watch services Virginia, Security guards Northern Virginia, security guards for hotels, security guards for hospitals ,security guards for schools, security guards for retail stores, security guards Alexandria VA, security services Manassas VA'
        },
        'investigations-and-intelligence': {
          title: 'Investigations & Intelligence Maryland | Virginia Surveillance Force',
          description: 'Virginia Surveillance Force offers expert investigation and intelligence services across Maryland and Washington DC. Protect your interests—request a quote today!',
          keywords: 'security company Maryland, security services Washington DC, private security services Maryland, professional security services, licensed security guards Virginia, armed security services Virginia, armed security guards Maryland, unarmed security services Virginia, security services DC Maryland Virginia , Commercial security services Virginia, Residential security services Virginia, Corporate security services Virginia, Executive protection Virginia , 24/7 security services Virginia , Security patrol services Virginia, Fire watch services Virginia, Security guards Northern Virginia, security guards for hotels, security guards for hospitals ,security guards for schools, security guards for retail stores, security guards Alexandria VA, security services Manassas VA'
        },
        'vip-executive-protection-and-body-guard-service': {
          title: 'VIP Executive Protection & Body Guard Service | Virginia Surveillance Force',
          description: 'Virginia Surveillance Force offers VIP executive protection and bodyguard services across Maryland and Washington DC. Safeguard your profile—request a quote today!',
          keywords: 'security company Maryland, security services Washington DC, private security services Maryland, professional security services, licensed security guards Virginia, armed security services Virginia, armed security guards Maryland, unarmed security services Virginia, security services DC Maryland Virginia , Commercial security services Virginia, Residential security services Virginia, Corporate security services Virginia, Executive protection Virginia , 24/7 security services Virginia , Security patrol services Virginia, Fire watch services Virginia, Security guards Northern Virginia, security guards for hotels, security guards for hospitals ,security guards for schools, security guards for retail stores, security guards Alexandria VA, security services Manassas VA'
        },
        'courier-and-delivery': {
          title: 'Medical, Legal Courier & Delivery | Virginia Surveillance Force',
          description: 'Virginia Surveillance Force provides secure medical and legal courier services across Maryland and Washington DC. Safeguard your sensitive deliveries—request a quote today!',
          keywords: 'security company Maryland, security services Washington DC, private security services Maryland, professional security services, licensed security guards Virginia, armed security services Virginia, armed security guards Maryland, unarmed security services Virginia, security services DC Maryland Virginia , Commercial security services Virginia, Residential security services Virginia, Corporate security services Virginia, Executive protection Virginia , 24/7 security services Virginia , Security patrol services Virginia, Fire watch services Virginia, Security guards Northern Virginia, security guards for hotels, security guards for hospitals ,security guards for schools, security guards for retail stores, security guards Alexandria VA, security services Manassas VA'
        }
      };

      const updatedServices = servicesPage.services.map((svc) => {
        if (servicesSeoMap[svc.slug]) {
          return {
            ...svc,
            seo: servicesSeoMap[svc.slug]
          };
        }
        return svc;
      });

      await db.collection('settings').updateOne(
        { _id: 'page_services' },
        { $set: { services: updatedServices } }
      );
      console.log('Successfully updated individual services SEO in DB');
    }
  } catch (err) {
    console.error('Migration error:', err);
  } finally {
    await client.close();
  }
}

main();
