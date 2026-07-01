export interface TestimonialVideo {
  id: string;
  src: string;
  title: string;
}

export interface TestimonialLetter {
  id: string;
  name: string;
  date: string;
  role: string;
  contentHtml: string;
}

export interface TestimonialsPageData {
  _id?: string;
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
  videos: TestimonialVideo[];
  letters: TestimonialLetter[];
}

export const defaultTestimonialsData: TestimonialsPageData = {
  seo: {
    title: "Testimonials - Virginia Surveillance Force",
    description: "Read letters and watch video reviews from our clients. Over the years, Virginia Surveillance Force has served a variety of businesses and residential communities.",
    keywords: "testimonials, reviews, client feedback, security reviews, virginia surveillance force reviews"
  },
  videos: [
    {
      id: "vid_1",
      src: "https://fast.wistia.net/embed/iframe/3qke4guqs5?canonicalUrl=https%3A%2F%2Fsurveillance-patrol.wistia.com%2Fmedias%2F3qke4guqs5&canonicalTitle=Barbra%20A.%20Ghent%20-%20Virginia%20Surveillance%20Force%20Testimonial%2FReview%20-%20surveillance-patrol",
      title: "Barbra A. Ghent",
    },
    {
      id: "vid_2",
      src: "https://fast.wistia.net/embed/iframe/f3b0b4l8lu?canonicalUrl=https%3A%2F%2Fsurveillance-patrol.wistia.com%2Fmedias%2Ff3b0b4l8lu&canonicalTitle=Adnan%20Ali%20-%20Virginia%20Surveillance%20Force%20Testimonial%2FReview%20-%20surveillance-patrol",
      title: "Adnan Ali",
    },
    {
      id: "vid_3",
      src: "https://fast.wistia.net/embed/iframe/1a3h4yb18h?canonicalUrl=https%3A%2F%2Fsurveillance-patrol.wistia.com%2Fmedias%2F1a3h4yb18h&canonicalTitle=Jeffrey%20Goldberg%20-%20Virginia%20Surveillance%20Force%20Testimonial%2FReview%20-%20surveillance-patrol",
      title: "Jeffrey Goldberg",
    },
    {
      id: "vid_4",
      src: "https://fast.wistia.net/embed/iframe/ciw0vtcopm?canonicalUrl=https%3A%2F%2Fsurveillance-patrol.wistia.com%2Fmedias%2Fciw0vtcopm&canonicalTitle=Candace%20Kiman%20-%20Virginia%20Surveillance%20Force%20Testimonial%2FReview%20-%20surveillance-patrol",
      title: "Candace Kiman",
    },
    {
      id: "vid_5",
      src: "https://fast.wistia.net/embed/iframe/ujof314ycx?canonicalUrl=https%3A%2F%2Fsurveillance-patrol.wistia.com%2Fmedias%2Fujof314ycx&canonicalTitle=Sheila%20A.%20Foote%20-%20Virginia%20Surveillance%20Force%20Testimonial%2FReview%20-%20surveillance-patrol",
      title: "Sheila A. Foote",
    },
  ],
  letters: [
    {
      id: "let_1",
      name: "Edward Germain",
      date: "December 18, 1996",
      role: "President",
      contentHtml: "<p>I highly recommend the outstanding services of Virginia Surveillance Force to other businesses.</p><p>Captain M. Saleem & Lieutenant Luis Reyes are very dependable. My staff members Julie, Jane, Bonny and Chris feel very safe and comfortable with VSF officers and staff members.</p><p>I am very happy with VSF Services and look forward to continue our relationship for many future endeavors.</p>",
    },
    {
      id: "let_2",
      name: "James L. Pierce",
      date: "February 11, 2002",
      role: "Director",
      contentHtml: "<p>I am writing this letter to commend the performance of one of your security guard who works at our office complex on various occasion's. His name is Khan and he always seems alert and active in performing his duties at our facility.</p><p>I often visit our offices after hours on weekdays and weekends. When ever Mr. Khan is on duty, he is found to be actively patrolling the area and always seems alert in observing the comings and goings of our area. You have a good man in Mr. Khan who seems conscientious, professional and friendly. We appreciate his good efforts and thank both you and him.</p>",
    },
    {
      id: "let_3",
      name: "Barbara A. Ghent",
      date: "October 21, 2002",
      role: "Property Manager",
      contentHtml: "<p>I am very pleased to write this letter on behalf of \"Virginia Surveillance Force\" As a property manager of three very busy and diverse apartment communities in Northern Virginia for past 26 years I have experienced the services, or disservice in some cases, of several different security companies. Without hesitation, I can honestly say that I am very pleased with the outstanding job that Virginia Surveillance force has done on our properties for the past several years.</p><p>Hardly a month goes by that I don't receive at least one solicitation from competing Security Companies in the area. I do not even consider these solicitation. I have found that all members of the Virginia Surveillance Force, from the top soldier to the last patrol officer on the ladder, are all extremely responsive to our needs as well to the needs of our tenants. Over the years property management in general has become more and more challenging in trying to maintain a safe environment for our tenants to enjoy. Knowing that the Virginia Surveillance Force is on the job and working harmony with my staff and our tenants has made this part of my job almost worry free.</p>",
    },
    {
      id: "let_4",
      name: "Thomas S. Patti",
      date: "October 21, 2002",
      role: "President",
      contentHtml: "<p>Please accept this letter as a recommendation for the services provided by Virginia Surveillance Force, Inc. Several of the condominium communities managed by us have utilized VSF services for at least three years. During that time, we have found both VSF supervisors and staff to be professional, courteous and effective.</p><p>Of particular interest to our communities is the responsiveness of the staff. We have requested and receive periodic written reports on a timely basis. When a question arises, the supervisory staff responds quickly. Virginia Surveillance Force management has also met with the Boards of Directors to address the special concerns and needs of individual communities and they have been instrumental in developing unique solutions and strategies.</p><p>We look forward to our continued relationship with Virginia Surveillance Force, Inc and commend them to you.</p>",
    },
    {
      id: "let_5",
      name: "Allen N. Norris",
      date: "October 21, 2002",
      role: "Property Manager",
      contentHtml: "<p>Virginia Surveillance Force provide Security Services for our residential and commercial/retail properties. This service has been excellent.</p>",
    },
    {
      id: "let_6",
      name: "Richard F. Rogers",
      date: "October 22, 2002",
      role: "President, Board of Governors",
      contentHtml: "<p>Congradulation on your recent addition of security services for neighboring apartments. Our contract with Virginia Surveillance Force, Inc. (VSF) is now sixteen months into a new experiance for our community. it is noteworthy to mention the reliable service that VSF has provided to our community. Our liaison officers working directly with your security officers on a daily basis has produced a noticeable decline in loitering, trespass, and similar disturbances.</p><p>On behalf of our board of Governors, I extend our sincere appreciation for your efforts and considerable results over the past year.</p>",
    },
    {
      id: "let_7",
      name: "Thelma Oliver",
      date: "October 25, 2002",
      role: "Community Manager",
      contentHtml: "<p>We have used Virginia Surveillance Force for over three years to patrol our property on a nightly basis. We have been and continue to be a very satisfied customer. Major saleem and his officers conduct themselves in a professional manner at all times. The nightly reports which we are issued let us know of any problems which occur during the night so that we can take preventative measures.</p><p>I highly recommend Virginia Surveillance Force to other businesses.</p>",
    },
    {
      id: "let_8",
      name: "Julie Thompson",
      date: "October 26, 2002",
      role: "Director",
      contentHtml: "<p>We highly recommends the services provided by Virginia Surveillance Force, Inc. (VSF). We have been receiving outstanding armed security protection from VSF Since 1996. The officers are professional, reliable, dependable and well trained.</p><p>We feel safe and comfortable with VSF officers and staff. They are not only courteous but they are helpful as well. We are happy with VSF services and look forward to continuing our relationship with Virginia Surveillance Force for many future endeavors. Going by my personal experience as a Director, Virginia Surveillance Force is one of the best security companies in Virginia. We feel very privileged to have then fill all our security needs.</p><p>We are proud of our services and Virginia Surveillance Force helps us maintain that pride!</p><p>Sincerely</p>",
    },
    {
      id: "let_9",
      name: "Cheryl Chandler",
      date: "November 14, 2002",
      role: "Resident Manager",
      contentHtml: "<p>I am very pleased to write that our staff at apartment community highly recommends the services provided by Virginia Surveillance Force, Inc. We have found Major Saleem, his supervisors and uniformed security staff are professional, courteous, effective and dependable.</p><p>VSf Officers always seems alert and active while performing their duties at our facilities on Rout 1. Virginia Surveillance and their staff have performed an outstanding job for the community. I feel very privileged with professionalism and the difference Virginia Surveillance presence has made to our community.</p><p>I am pleased to say that I am very satisfied with the excellent services of Virginia Surveillance Force, Inc. (VSF) is providing to our community. I highly recommend VSF to other businesses.</p>",
    },
    {
      id: "let_10",
      name: "Rosemarie Bouchard",
      date: "December 2, 2002",
      role: "Director/CEO",
      contentHtml: "<p>On behalf of management of Jewelry stores, I would like to give recognition to Virginia Surveillance Force for providing outstanding Armed Protective Services.</p><p>We feel safe and comfortable with Major M. Saleem, his supervisors, staff and officers. VSF provide services to our stores located in Northern Virginia area. VSF Armed Uniformed Officers are professional, well trained, reliable and competent.</p><p>I am very satisfied with the excellent services of Virginia Surveillance Force, Inc. and I commend VSF to other corporations</p>",
    },
    {
      id: "let_11",
      name: "Jennifer Ranft",
      date: "June 30, 2003",
      role: "Financial Center Manager",
      contentHtml: "<p>Virginia Surveillance Force has been providing us with an outstanding protection since 2002. VSF Officers at our Bank are professional, reliable, trust-able, active and well trained. We feel safe and comfortable with VSF officers and staff.</p><p>I am pleased to say that I am very satisfied with the performance of VSF officers at our facility. I recommend Virginia Surveillance Force, Inc to other businesses for their protective needs.</p>",
    },
    {
      id: "let_12",
      name: "Neal Krysinski",
      date: "March 7, 2007",
      role: "Property Manager",
      contentHtml: "<p>We wanted to touch base with you concerning your company's performance. As you know, we hired Virginia Surveillance because the Town Center was expanding with the addition of the Office Building & Movie Theater/Restaurant Complex. Our goal was to upgrade our security presence and also strengthen our evening patrolling at shutdown, especially at our Office Building and Warehouse Properties.</p><p>You will be pleased to know that we are very satisfied with the services we received from VSF and your staff of guards that patrol on-site for us. Some of the specific areas that we feel Virginia Surveillance (VSF) has excelled at are:</p><ul class=\"mb-4 ml-5 list-disc\"><li>VSF has adopted to our specific needs and exceeded our expectations.</li><li>The VSF Corporate Office is very efficient and responsive. All of our questions are answered in a timely fashion and we feel important as a client.</li><li>The guards have consistently checked our properties at closing and reported any issues as they occurred. They exhibit a responsibility for our property which we appreciate.</li><li>The Guards and Supervisors have displayed a very professional attitude when dealing with the public which is extremely critical to us in this environment.</li><li>VSF has been very effective at meeting our last minute emergency needs as they arise.</li></ul><p>In addition, we feel VSF has gone the extra mile in helping to manage the center during the Friday Night Concert Series and Farmers Marked that run through the summer months. The organizers asked me to pass on to you their thanks and appreciation, especially to Seth who generally works Friday night.</p><p>We realize the amount of public activity at this property is enormous and VSF has done an outstanding job developing the kind of relationship's with the surrounding homeowners that we envisioned when this project started. Thank you for your continued efforts and please keep up the good work.</p>",
    },
    {
      id: "let_13",
      name: "Barbara A. Ghent",
      date: "September 24, 2007",
      role: "Property Manager",
      contentHtml: "<p>It gives me a great pleasure to write this letter on behalf of Major Saleem and the Virginia Surveillance Force, Inc. We have employed the services of Virginia Surveillance Force for past twelve years. During this time Major Saleem has provided nighttime security patrol services for the three apartment complexes consisting of six hundred and seventy two apartment homes.</p><p>Thanks to the outstanding and dedicated work of Major Saleem and his patrol officers, criminal activity and other nuisance activities, have been kept to an absolute minimum. This has contributed to our abilities to maintain our apartment communities at a high occupancy. Our tenants have always appreciated knowing that their home was safe.</p><p>Major Saleem have always been very involved with the training of his officers and ensuring that they are where they are supposed to be and doing what they are supposed to be doing. He has also been actively involved with our management team ensuring that our security needs were being met. He and his staff have always been extremely responsive to any concerns that we may regarding security issues.</p>",
    },
    {
      id: "let_14",
      name: "Dr. Mian M. Saeed",
      date: "March 23, 2009",
      role: "President",
      contentHtml: "<p>TO WHOM IT MAY CONCERN</p><p>I Understand that you are considering the appointment of Major M. M. Saleem, Ph.D. Regional Manager, well reputed, Virginia Surveillance Force as a Security Chief in your Security Department. I have no hesitation in saying that he would be an excellent choice and would truly justify the confidence that you will repose in him.</p><p>Major M. M. Saleem is known to me fairly intimately for a number of years. He is a man of rare personal charm and has always impressed me by his urbanity and culture. He has been engaged as a Security Chief of our center since 2007. He is hardworking and conscientious man and a very pleasant and cooperative one. I have always found him to be the most kind and courteous. He is dedicated and well-motivated and has exceptional talents and a pleasant personality which wins him the friendship of his colleagues.</p><p>Major M. M. Saleem has a genial temperament and is very easy to get along with. He has a high sense of duty and a mature and serious outlook on life. He is sure to make a well-liked colleague and devoted person to his duties. I am glad to recommend him most strongly and whole-heartedly.</p><p>Sincerely</p><p>M.A.Ph.D (London) F.R.A.S,</p>",
    },
    {
      id: "let_15",
      name: "Sheila A. Foote",
      date: "May 29, 2009",
      role: "General Manager",
      contentHtml: "<p>We have utilized Virginia Surveillance Force, Inc. for several years for both security and fire watch services. I have found Major Saleem and his staff to be efficient and extremely responsive to our needs. For emergency fire watch services they respond quickly, maintaining all records required by local fire department personnel. His employees are always on time, diligent in their duties, neatly attired in their uniforms and pleasant to our staff and residents.</p>",
    },
    {
      id: "let_16",
      name: "Jeffrey Goldberg",
      date: "June 4, 2009",
      role: "Managing Member",
      contentHtml: "<p>To Whom It may Concern</p><p>It gives me a great pleasure to write this recommendation letter on behalf of Virginia Surveillance Force. We have been using the services of Virginia Surveillance Force for the past 15 years. During this time they have served our residential apartment properties. They have provided us a wide variety of services including Unarmed Security, Vehicle Patrol Service, and overnight Security coverage for our properties.</p><p>Virginia Surveillance Management, staff and officers are all extremely responsive to our needs as well to the needs of our tenants.</p><p>We are proud of our residential properties and Virginia Surveillance Force helps us to maintain that pride. We are pleased and satisfied with the excellent services provided by VSF. We look forward to our continued relationship with Virginia Surveillance Force and highly recommend Virginia Surveillance Force to other businesses. Please feel free to contact me if you have any questions. Thank You</p>",
    },
    {
      id: "let_17",
      name: "Ronald Pyszczynski",
      date: "February 23, 2010",
      role: "President",
      contentHtml: "<p>The Council of Co-Owners of the Condominium wishes to express their gratitude to Virginia Surveillance Force, Inc. for providing around the clock coverage of our Front Desk during the recent snow storm.</p><p>Please convey our sincere appreciation to your officers. These gentlemen worked throughout the storm, and did an amazing job meeting the needs of our many residents.</p><p>Sincerely</p>",
    },
    {
      id: "let_18",
      name: "Candace Kiman",
      date: "March 18, 2010",
      role: "Community Association Manager",
      contentHtml: "<p>To Whom It May Concern</p><p>We are very pleased with the level of service provided by Virginia Surveillance Force. The Officers arrive on site professionally dressed uniform. They carry out their duties in all weather conditions and keep a vigilant watch. They also provide a clear and concise written report to the management office every morning.</p><p>The Officers provide clear picture of what has happened overnight so management make take proactive approach to any possible problems. They survey the common areas including the pool, playgrounds and laundry/storage areas and provide e-mail photographs. The photographs assist the management office to identify damages not only to the common elements but also to homeowner property.</p><p>In one particular incident an officer was able to photograph damages to a vehicle incurred from another vehicle. The owner of the damaged vehicle was contacted with the information and was very grateful because he was not aware his vehicle had been harmed overnight in the parking lot.</p><p>Officers respond quickly to concerns of residents and are very respectful of them. When needed they have called the police in behalf of the residents. They stay during the police investigation and report their findings to management.</p><p>Officers report lights out on the common grounds and make sure laundry rooms are locked. They help to enforce parking rules and regulations and inform residents of our policies. When they see people loitering or trespassing they are quick to get those people to move on or contact the police department.</p><p>We have a very good line of communication with the officers. As they report to management we are able to provide information to them about things that are of particular interest to us which is very beneficial.</p><p>We would like you to know the Virginia Surveillance Force is held in high regard not only be management but our residents as well.</p><p>Sincerely,</p>",
    },
    {
      id: "let_19",
      name: "Adnan Ali",
      date: "January 28, 2013",
      role: "Director United Postal Service",
      contentHtml: "<p>I am pleased to write that I would recommend Virginia Surveillance Force to other businesses. Major Saleem, his staff & officers provided an excellent service during Christmas Season. Virginia Surveillance Force & its officers are an asset to our organization.</p><p>Their Officers have excellent written & verbal communication skills, extremely organized. Their Alarm response officer work independently are are able to effectly multi-task to ensure that all projects are completed in a timely manner.</p><p>Virginia Surveillance, its staff and Major saleem are a goal oriented, reliable. Their leadership skills and work ethic would be a valuale asset for any organization or company. They are trusted and responsible.</p><p>They are the most reliable company we worked with for our security needs. Again I want to thank Major saleem for the hard work and timely responses to my service requests.</p><p>Please feel free to contact me, if you have further questions.</p>",
    },
  ]
};
