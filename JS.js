const responses = {
    "how are you": "I'm just a bot, but I'm here to help you!",
    "I need help": "How can I help you today?",
    "bye": "Goodbye! Have a great day!",
    "default": "I'm sorry, I didn't understand that. Want to connect with an expert?",
    "expert": "Great! Please contact +91 7795379604",
    "no": "Okay, if you change your mind just let me know!"
};

let userInfo = { name: '', email: '', contact: '', urgency: '', workType: '', renovationType: '', workScope: '', location: '', officeType: '', officeDesign: '', schoolType: '', schoolDesign: '', homeArea: '', livingRoomDesign: '', bedroomDesign: '', washroomDesign: '', costRange: '' };
let currentStep = null;

// Image URLs for the "Simple" cost range (0-15k)
const simpleDesignImages0_15k = {
    livingRoom: [
        'C:\Users\Sai Ganesh Reddy D\Desktop\internship\images\living.jpeg',
        'https://chiquehomeliving.com/wp-content/uploads/2023/05/bhjjhb.webp',
        'https://5.imimg.com/data5/SELLER/Default/2021/3/FH/FL/LK/119792149/designer-residential-living-room-false-ceiling-500x500.jpg'
    ],
    bedroom: [
        'https://assets-news.housing.com/news/wp-content/uploads/2022/07/29173126/Latest-POP-21.png',
        'https://www.asenseinterior.com/assets/uploads/477a12098eb6e2dd0f19073e73854a2b.webp',
        'https://media.designcafe.com/wp-content/uploads/2020/12/12194704/modern-pop-design-for-bedroom-with-cove-lights.jpg'
    ],
    washroom: [
        'https://www.ryancreativeliving.com/wp-content/uploads/2024/06/2-13.png',
        'https://psgroup.in/blog/wp-content/uploads/2021/11/12-Indescribable-False-Ceiling-Design-For-Shop-Ideas.jpg',
        'https://media.designcafe.com/wp-content/uploads/2021/01/07190448/bathroom-false-ceiling-design-ideas.jpg'
    ],
    officeCabin: [
        'https://i.pinimg.com/736x/4f/a9/68/4fa96823db32c2ba3f85b712b16ebc70.jpg',
        'https://images.kreatecube.com/usefull/vendor/7354/Gallery/1486.jpg',
        'https://i.pinimg.com/736x/d3/10/b9/d310b948c806821f5fe31bd735459880.jpg'
    ],
    officeCentralArea: [
        'https://img.staticmb.com/mbcontent/images/crop/uploads/2021/1/deep-blue_0_1200.jpg',
        'https://img.staticmb.com/mbcontent/images/crop/uploads/2021/1/false-ceiling-with-slits_0_1200.jpg',
        'https://5.imimg.com/data5/SELLER/Default/2024/4/413509520/ID/LR/QY/76658573/conference-hall-pop-ceiling-services-500x500.jpg'
    ],
    classroom: [
        'https://5.imimg.com/data5/UD/YF/AT/SELLER-69151832/school-false-ceiling-500x500.jpg',
        'hhttps://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrmR22JpNn2MMz6peZ0Hv4-cMRWy7rhsQ22cYa9US9via40K01uTIplPX8-EULUhACMHs&usqp=CAU',
        'https://i.pinimg.com/236x/fe/fa/ff/fefaffa34c77e77f1875f31dc6aaf7fe.jpg'
    ],
    chambers: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9nswNGsRB7Rf-mwWt6rJmZPNob9S8silRIQ&s',
        'https://mir-s3-cdn-cf.behance.net/projects/404/9fbb0693099195.5e5c9ff003be3.png',
        'https://5.imimg.com/data5/SELLER/Default/2023/8/334751245/SQ/LP/BD/151343304/office-false-ceiling-services-500x500.jpg'
    ],
    auditorium: [
        'https://www.bhume.in/_astro/websiteImg4.CDMD9fX9.webp',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1emCSzG19RAlEu5KlNHFk-MCuQccxV8bvRA&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1emCSzG19RAlEu5KlNHFk-MCuQccxV8bvRA&s'
    ]
};

// Image URLs for the "Simple" cost range (15-30k)
const simpleDesignImages15_30k = {
    livingRoom: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq0CaKXwITd6w4WTrPJnr3yCEcEF2U0ngIQg&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_l6tpTj09DKofwQx4uhcs6vitciJUJmDIJ1bMEHFK8nHKb9R62FsUgcET83XPG0InU10&usqp=CAU',
        'https://static.asianpaints.com/content/dam/asianpaintsbeautifulhomes/spaces/bedrooms/ten-amazing-ways-to-use-pop-for-fierce-bedroom-ceilings/textured-pop-ceiling-design.png'
    ],
    bedroom: [
        'https://5.imimg.com/data5/SELLER/Default/2021/2/PE/YH/FC/40884382/pop-bedroom-ceiling.jpg',
        'https://i.pinimg.com/736x/85/2e/da/852eda767e7907399b9a0fcb58972097.jpg',
        'https://3.imimg.com/data3/JD/ND/MY-12411530/white-pop-ceiling-500x500.jpg'
    ],
    washroom: [
        'https://img.staticmb.com/mbcontent/images/crop/uploads/2021/2/a-classic-backlit-mural-art-ceiling-for-your-bathroom_0_1200.jpg',
        'https://i.pinimg.com/564x/08/5e/e9/085ee9686939517162044e6ba3428702.jpg',
        'https://i.pinimg.com/236x/d6/21/3f/d6213f3262426fef8a1e88c0313c2665.jpg'
    ],
    officeCabin: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpU7N9pP57MaqjFGYyA9IiBpawJ5PkAWkAJg&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxSVLpStFz-XdFEi_Ju1uShHMXKRPErVRP69G75yz8AOnT_NGUWnWJS03j4xRiaFQ_lzE&usqp=CAU',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGjZf-GEAuWTvI3OcmGyVnvZjlNbsqcoO5w1wmowAZ63ZR3Ih-gBP3S1Xu7Fmvg7qnqNg&usqp=CAU'
    ],
    officeCentralArea: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDyBf5RRvKq_1gFeVEjiHkUNtgRP_uWHanzNPGQiDGLjpsg2bdyUTMuILrbrRXmdRtVrU&usqp=CAU',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKpqLL2yPGyXPWN6eVxKXRhlIGSdb0TWXxcpczqK9Bz2ltwD2_QpTcYbgOjcZY6dFi5Ic&usqp=CAU',
        'https://en.idei.club/uploads/posts/2023-08/thumbs/1690930647_en-idei-club-p-false-ceiling-design-for-conference-room-d-11.jpg'
    ],
    classroom: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEakkqsxjlXTCni7IKge7Jvd8WLpHh_r6VNw&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvmKWs2LRuPybOT_zmupoQ3WJWf8vn4Pf7dRCXBn5FJikvB64h1yVvzKGVxX5Ueg2AR58&usqp=CAU',
        'https://www.shutterstock.com/image-illustration/bright-empty-classroom-lessons-training-260nw-552897889.jpg'
    ],
    chambers: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4m4avod-X3L_wsHDDNSevxg44kOZmGN_DCCNRpUes1aNimHbMvRGaq5XLvqD0EXIBZXM&usqp=CAU',
        'https://i.pinimg.com/736x/7a/e2/bf/7ae2bf29d8b6083adec4422989919556.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzR9LMojPISqztdNjs3BivKJX40WGScjOMCw&s'
    ],
    auditorium: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1emCSzG19RAlEu5KlNHFk-MCuQccxV8bvRA&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9638QeUYtpJ4h0kMIQ0z7E5muT-vrx0kW3qqGpxlAcVD41EiarcxQuWuBDw6tVWU7l_Y&usqp=CAU',
        'https://i.pinimg.com/236x/ec/2a/f6/ec2af67b457006c4d454b53276607753.jpg'
    ]
};

// Image URLs for the "Modern" cost range (30-40k)
const modernDesignImages30_40k = {
    livingRoom: [
        'https://5.imimg.com/data5/SELLER/Default/2024/10/458925420/AW/PS/EM/32627011/hall-pop-design-services-500x500.jpg',
        'https://5.imimg.com/data5/FJ/OM/MY-18288090/pop-ceiling-work-500x500.jpg',
        'https://5.imimg.com/data5/ANDROID/Default/2022/6/IS/LA/TO/150297464/product-jpeg-500x500.jpg'
    ],
    bedroom: [
        'https://s.alicdn.com/@sc04/kf/Hcec687ccf28644869c2d10205a72ce209.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUqoh7LwSYJssVXctHKBPYNeztodKPwrwanA&s',
        'https://www.nerolac.com/sites/default/files/2023-07/modern-yet-simple-pop-ceiling-designs-for-your-bedroom.webp'
    ],
    washroom: [
        'https://assets-news.housing.com/news/wp-content/uploads/2022/02/22204126/POP3.jpg',
        'https://i.pinimg.com/236x/19/e9/4d/19e94dbc8045be26ebd38e20c9554f9b.jpg',
        'https://i.pinimg.com/236x/b8/07/ca/b807caf6d31717b5d6de206ef625870f.jpg'
    ],
    officeCabin: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiUmiOOsiOVFUEUNWoug0-K44iGTnMsmsGgA&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZi9ax_DpZQ2ORqMgIOn2r4K7cLqZSTnHCv3fs7S5GUytbEUFLKUttZuzmVG11VUi_SQk&usqp=CAU',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDI4tt9HItv6SWu8a7A0ZLEPsvlJOhSRnji9h40-LN2DJdOt-Nel5JskXcgjpkZFetJIg&usqp=CAU'
    ],
    officeCentralArea: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5pP1Z3LAqntPr9ELH7QXBHV8p04EeGMe9ug&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8XUmyHPEQ7VcYcBK6AtLBhjlpjcElxmo8YEYo2MbO6XIWGyJvCQ7xiUexiOzW4-oKY0A&usqp=CAU',
        'https://bdinterior.net/storage/2021/10/modern-office-interior-design-ideas-5-1024x908.jpg'
    ],
    classroom: [
        'https://www.shutterstock.com/image-illustration/modern-classroom-interior-wooden-chairs-260nw-2523438495.jpg',
        'https://www.shutterstock.com/image-illustration/modern-classroom-interior-green-cabinets-260nw-2523438491.jpg',
        'https://www.shutterstock.com/image-illustration/beige-wooden-auditorium-interior-chairs-260nw-2396059307.jpg'
    ],
    chambers: [
        'https://img.rockwool.com/https%3A%2F%2Fbrandcommunity.rockwool.com%2Fasset%2FvvnilYHQ-KskaqzhUcUSlA?rect=0.275087%2C0.070313%2C2124%2C2123&w=448&auto=format&s=9098deedbd8bfbfddce5b473b1ff593f',
        'https://spaces4learning.com/-/media/EDU/S4L/Images/2020/12/WallsCeilingsFloors04x640.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuYayWyFXt7kviC640gSbk7KiS5MDhT4am_g&s'
    ],
    auditorium: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVTEkjJiaoRRwqfDo5y-v-65KKC-wU1CY0kQ&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoppskXg50kUI-AxF2WoiLR2RuOR6_aeR9kQ&s',
        'https://www.appliedglobal.com/wp-content/uploads/6-Unique-Considerations-for-AV-Design-in-Your-Auditorium.png'
    ]
};

// Image URLs for the "Modern" cost range (40-50k)
const modernDesignImages40_50k = {
    livingRoom: [
        'https://s3.ap-south-1.amazonaws.com/mbprodimages/images/interiorDesignerCMS/decorPartner/105/projectImage/modern-simple-false-ceiling-design-for-living-room-09.jpg',
        'https://5.imimg.com/data5/YO/MM/MY-50567571/modern-pop-false-ceiling-250x250.jpg',
        'https://www.homelane.com/blog/wp-content/uploads/2021/11/symmetrical-ceilings-pop-designs.png'
    ],
    bedroom: [
        'https://www.nerolac.com/sites/default/files/2023-07/modern-yet-simple-pop-ceiling-designs-for-your-bedroom.webp',
        'https://static.asianpaints.com/content/dam/asianpaintsbeautifulhomes/spaces/bedrooms/ten-amazing-ways-to-use-pop-for-fierce-bedroom-ceilings/false-ceiling-design.jpg',
        'https://img.staticmb.com/mbcontent/images/crop/uploads/2023/12/double-gypsum-board-pop-design-for-bedroom_0_1200.jpg'
    ],
    washroom: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfMenbl7e2QH4BKv-pA6nhvqvige9US9X8EA&s',
        'https://psgroup.in/blog/wp-content/uploads/2021/11/Sunroof-in-bathroom.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv8TqYnB2JikshU4tR0STuGfgkUBbPNr-TCFVPxq50vgaOQ9qrviANd-4D4nBG1rkeNqk&usqp=CAU'
    ],
    officeCabin: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsohCM_SUA0P0FoADtxGnGmcZXw6cjOT0r0g&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsGqeFKahpyDpdcNiPFAbSkcW-dABsHiCqvETcAfkptCOx5A_MaXOItH0yBepdCWRp59Y&usqp=CAU',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtx7iy4DZHNYp-_1t_twv_UbjcL_dcXQid3vqgVn5GPeZbKYPWpI-42GdRrqk12Nap5yQ&usqp=CAU'
    ],
    officeCentralArea: [
        'https://i.pinimg.com/564x/0c/7e/a9/0c7ea971293954ee054ff6f8a00e9182.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRz2Wlno7o1O4xEBgAZvYEXcmTvq0iohMuEqz7fRBlNsFS06lFFH5W_yYm0sy96q7TZ-dQ&usqp=CAU',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpVP-70zec4ytwEdg8I0Rsm5PQBJwoIfBf__vqkibdMUjV0TmzxqmMZBxzTXKNC_fn3k0&usqp=CAU'
    ],
    classroom: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ8PBhzXjOBYy85AYB6Lt99nEVx-SQq_5q-Q&s',
        'https://media.istockphoto.com/id/947959224/photo/3d-rendering-of-an-empty-classroom.jpg?s=170667a&w=is&k=20&c=m2abe3j_N2-iVDQzJtCfTtbLNJfjsNSuOrd5_xfnjak=',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyuWlgR0ODxj9DPnKTz9U_4YC0_CHfjRr5q315rct_XnZwJchjDvIzQRr1FMYDU1Tz6zQ&usqp=CAU'
    ],
    chambers: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ86yeODVw0qpRqU7A2od98uUqa_RKWJCCBiA&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqaSlbS1d4RgcVNGKmlAXKOmiy1ZW_gpuX4w&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ01LNAKZPFFVmdg_kDtk_ZxbKYwwTW_fJCWQ&s'
    ],
    auditorium: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFffg9XLbdhMhhsgsHQOHaG0CjuOawtzpEhQ&s',
        'https://assets.isu.pub/document-structure/230429070133-ed89c501ef3ac6e6d64dd78c6fa7afb5/v1/712fe0c5aa2bee9990d2c37ef8c15428.jpeg',
        'https://5.imimg.com/data5/OI/SY/YY/SELLER-3947012/complete-interior-technical-services-for-auditoriums-500x500.jpg'
    ]
};

// Image URLs for the "Latest" cost range (50-70k)
const latestDesignImages50_70k = {
    livingRoom: [
        'https://5.imimg.com/data5/ANDROID/Default/2021/1/JG/IW/AQ/108380651/product-jpeg-500x500.jpg',
        'https://media.designcafe.com/wp-content/uploads/2023/04/23221323/3D-POP-designs-for-bedroom.jpg',
        'https://images.housegyan.com/media/1732859058143-Layered-Low-Cost-Simple-POP-Ceiling-Design-for-Hall.webp'
    ],
    bedroom: [
        'https://www.nobroker.in/blog/wp-content/uploads/2024/10/down-ceiling-pop-design-for-bedroom-1200x673.webp',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiDm4s4UphiJCXObU0GUY2bQqsVUduCHTiDmLkqC_1PSdbvO5H2oHDoYyEAgX7tYlcHDE&usqp=CAU',
        'https://www.archid.co.za/wp-content/uploads/2022/10/Best-ceiling-design-ideas-for-the-bedroom_Archid.png'
    ],
    washroom: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPaeLGDK-1aXaQrxi-spQh31GmBBxrngkfNA&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGg_uGZYUCV2GXkSn5X-iYkZSoRXVQzBagPCYfZNU2IM_P9sY9M7bQI8r4XebbhDN7DY8&usqp=CAU',
        'https://assets-news.housing.com/news/wp-content/uploads/2022/02/17235548/8-31.jpg'
    ],
    officeCabin: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSc5fWWw809ZFdhHUcp9iJOQI0atv1jEEOGw&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMKESQDAsSRlJqNebI8gG5zdEWdC7ggcax_Q&s',
        'https://images.kreatecube.com/usefull/vendor/35345/Gallery/14825.jpg'
    ],
    officeCentralArea: [
        'https://en.idei.club/uploads/posts/2023-08/thumbs/1690975720_en-idei-club-p-conference-room-false-ceiling-dizain-pinte-16.jpg',
        'https://en.idei.club/uploads/posts/2023-08/thumbs/1690930642_en-idei-club-p-false-ceiling-design-for-conference-room-d-76.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR68sOGXknguAtBqC5uZX-F3S99NcPasitafptjbv0V50yUdLtnkhD5fFm66VhkpU7OuX8&usqp=CAU'
    ],
    classroom: [
        'hhttps://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTalIJHM0IDMvGiDXgfTtQvCVJqg6xLM5QdwQ&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxtDfsudyAwiy-Cv3kMGYb1WIxU6wUSGeWBg&s',
        'https://img.rockwool.com/https%3A%2F%2Fbrandcommunity.rockwool.com%2Fasset%2FvvZdgLrhUxBUyePdVnn8Sg?auto=format&s=b33d8c6b5d1476c7d1650017f7bac126'
    ],
    chambers: [
        'https://i.pinimg.com/550x/57/f3/29/57f3290ba8f6d244136c3b3bcf233657.jpg',
        'https://i.pinimg.com/236x/e2/df/9c/e2df9c94c1f133b20a5be0de48184305.jpg',
        'https://i.pinimg.com/236x/d6/ff/0b/d6ff0b45bfd64abfa88473b1e8b036a3.jpg'
    ],
    auditorium: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPq5YZLR3fYkciU7UYEcHf6pirsZk9qF2Umg&s',
        'https://i.pinimg.com/236x/46/3d/7c/463d7cfa217813d157140c3d595b1fd9.jpg',
        'https://i.pinimg.com/236x/1b/6b/46/1b6b4637eac97354eac9efb81b9730b9.jpg'
    ]
};

// Image URLs for the "Latest" cost range (70-90k)
const latestDesignImages70_90k = {
    livingRoom: [
        'https://img.staticmb.com/mbcontent/images/crop/uploads/2021/1/red-and-white_0_1200.jpg',
        'https://www.nobroker.in/blog/wp-content/uploads/2024/03/leaf-design.jpg',
        'https://images.woodenstreet.de/image/data/blog-images/24-mar-2024/13.jpg'
    ],
    bedroom: [
        'https://cms.interiorcompany.com/wp-content/uploads/2023/01/zones-of-light-bedroom-false-ceiling-design-1.jpg',
        'https://assets-news.housing.com/news/wp-content/uploads/2022/02/22223652/beroom2.png',
        'https://5.imimg.com/data5/ANDROID/Default/2021/9/XS/VH/SS/81044990/product-jpeg-500x500.jpg'
    ],
    washroom: [
        'https://psgroup.in/blog/wp-content/uploads/2021/11/image17.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS23TpZQr8PhOKlFhaXtoqt7obqdyxD4Q0Dsr8hcGIgelO4WRVvZPpSfJgIWjc0QM8iqQ&usqp=CAU',
        'https://example.com/washroom-latest-70-90k-3.jpg'
    ],
    officeCabin: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6b3BG4OYwizjZwcRuBO1kaieH7GzUkxkdDw&s',
        'https://5.imimg.com/data5/VE/PI/MY-40334811/boss-cabin-interior-designing-service-500x500.jpg',
        'https://5.imimg.com/data5/SELLER/Default/2024/4/407581500/LP/AA/UO/113608108/office-interior-designing-service-1-500x500.jpg'
    ],
    officeCentralArea: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6DzkuzGv519v1nyO-CMxLgokwwiPT8lLs9w&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQayJpugG2oXB6kQTtzqmlw6wQUzgLTzlf5Hj25HPVNtubb_JIY-YArEHcALAD7XyH7YnM&usqp=CAU',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQInrfBZ61cQv7lrs0HrT435OPN_tNwJFagBA&s'
    ],
    classroom: [
        'hhttps://img.rockwool.com/https%3A%2F%2Fbrandcommunity.rockwool.com%2Fasset%2FvvZdgLrhUxBUyePdVnn8Sg?auto=format&s=b33d8c6b5d1476c7d1650017f7bac126',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVQOykIeUNa4jr5sjXKVJg-ReDZuyxK9YEmqkQJNoN1euY9ObA3DAo8Skm5clsII11dho&usqp=CAU',
        'https://s3images.coroflot.com/user_files/individual_files/413719_UzuM_zYhQfs_2aA7rv37C3O7L.png'
    ],
    chambers: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwJpDPDXoEI5KJqVwsa5mHncxjCynGfy_WPw&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkYfs7RDCf1nJj95d08_R1q0h4gJ2jOuSTew&s',
        'https://i.pinimg.com/550x/fe/fa/ff/fefaffa34c77e77f1875f31dc6aaf7fe.jpg'
    ],
    auditorium: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4w08qsYFhVWM7A0ygw309MxyyQsBdO6-aPMzNlPOVubD3jlNTvB3dtiK8JWesoaoJqMs&usqp=CAU',
        'https://i.pinimg.com/236x/21/4a/17/214a17510dc2b7b85230f8095cc55502.jpg',
        'https://rulonco.com/wp-content/uploads/2022/04/Chisolm-Trail-HS-1-scaled.jpg'
    ]
};
function displayWelcomeMessage() {
    appendMessage('bot', 'Hello! Welcome to our chatbot. How can I assist you today? First, may I know your name?');
    currentStep = 'name'; // Set the current step to 'name' to start collecting user information
}

document.getElementById('chatbot-toggle-btn').addEventListener('click', toggleChatbot);
document.getElementById('close-btn').addEventListener('click', toggleChatbot);
document.getElementById('send-btn').addEventListener('click', sendMessage);
document.getElementById('user-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') sendMessage();
});

function toggleChatbot() {
    const chatbotPopup = document.getElementById('chatbot-popup');
    if (chatbotPopup.style.display === 'none' || chatbotPopup.style.display === '') {
        chatbotPopup.style.display = 'block';
        displayWelcomeMessage(); // Display the welcome message when the chatbot is opened
    } else {
        chatbotPopup.style.display = 'none';
    }
}


function sendMessage() {
    const userInput = document.getElementById('user-input').value.trim();
    if (userInput !== '') {
        appendMessage('user', userInput);
        handleUserInput(userInput);
        document.getElementById('user-input').value = '';
    }
}

function handleUserInput(userInput) {
    if (currentStep === 'name') {
        // Validate name (only letters and spaces allowed)
        if (/^[A-Za-z\s]+$/.test(userInput)) {
            userInfo.name = userInput;
            currentStep = 'email';
            appendMessage('bot', 'Thanks! Now, please enter your email:');
        } else {
            appendMessage('bot', 'Please enter a valid name (only letters and spaces are allowed).');
        }
    } else if (currentStep === 'email') {
        // Validate email format
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userInput)) {
            userInfo.email = userInput;
            currentStep = 'contact';
            appendMessage('bot', 'Great! Finally, please enter your contact number:');
        } else {
            appendMessage('bot', 'Please enter a valid email address (e.g., example@domain.com).');
        }
    } else if (currentStep === 'contact') {
        // Validate phone number (10 digits, numbers only)
        if (/^\d{10}$/.test(userInput)) {
            userInfo.contact = userInput;
            currentStep = 'confirm';
            appendMessageWithButtons('bot', `Thank you! Here's the information you provided: ${userInfo.name}, ${userInfo.email}, ${userInfo.contact}. Is this correct?`, ['Yes', 'No']);
        } else {
            appendMessage('bot', 'Please enter a valid 10-digit phone number (numbers only).');
        }
    } else if (currentStep === 'confirm') {
        if (userInput.toLowerCase() === 'yes') {
            currentStep = 'urgency';
            appendMessageWithButtons('bot', `Hello ${userInfo.name}, should the work be done immediately or later?`, ['Immediately', 'Later']);
        } else if (userInput.toLowerCase() === 'no') {
            userInfo = { name: '', email: '', contact: '', urgency: '', workType: '', renovationType: '', workScope: '', location: '', officeType: '', officeDesign: '', schoolType: '', schoolDesign: '', homeArea: '', livingRoomDesign: '', bedroomDesign: '', washroomDesign: '', costRange: '' };
            currentStep = 'name';
            appendMessage('bot', 'Let’s try again. Please enter your name:');
        } else {
            appendMessageWithButtons('bot', 'Please confirm if the information is correct:', ['Yes', 'No']);
        }
    } else if (currentStep === 'urgency') {
        userInfo.urgency = userInput.toLowerCase();
        currentStep = 'workType';
        appendMessageWithButtons('bot', 'Is the work new or a renovation?', ['New', 'Renovation']);
    } else if (currentStep === 'workType') {
        userInfo.workType = userInput.toLowerCase();
        currentStep = 'renovationType';
        appendMessageWithButtons('bot', 'Is the work for a wall or ceiling?', ['Wall', 'Ceiling']);
    } else if (currentStep === 'renovationType') {
        userInfo.renovationType = userInput.toLowerCase();
        currentStep = 'workScope';
        appendMessageWithButtons('bot', 'Does the work include full electrical work or only POP work?', ['Full Electrical', 'POP Only']);
    } else if (currentStep === 'workScope') {
        userInfo.workScope = userInput.toLowerCase();
        currentStep = 'location';
        appendMessageWithButtons('bot', 'Please select the location:', ['Home', 'Office', 'School/College']);
    } else if (currentStep === 'location') {
        userInfo.location = userInput.toLowerCase();
        if (userInfo.location === 'home') {
            currentStep = 'homeArea';
            appendMessageWithButtons('bot', 'Please select the home area:', ['Living Room', 'Bedroom', 'Washroom']);
        } else if (userInfo.location === 'office') {
            currentStep = 'officeType';
            appendMessageWithButtons('bot', 'Is it a Cabin or Central Area?', ['Cabin', 'Central Area']);
        } else if (userInfo.location === 'school/college') {
            currentStep = 'schoolType';
            appendMessageWithButtons('bot', 'Is it a Classroom, Chambers, or Auditorium?', ['Classroom', 'Chambers', 'Auditorium']);
        } else {
            currentStep = null;
            appendMessage('bot', `Thank you! The work involves ${userInfo.workScope} on the ${userInfo.renovationType} at your ${userInfo.location}. Is there anything else I can assist you with?`);
        }
    } else if (currentStep === 'officeType') {
        userInfo.officeType = userInput.toLowerCase();
        currentStep = 'officeDesign';
        appendMessageWithButtons('bot', 'Please select the design type for your office:', ['Simple', 'Modern', 'Latest']);
    } else if (currentStep === 'officeDesign') {
        userInfo.officeDesign = userInput.toLowerCase();
        if (userInfo.officeDesign === 'simple') {
            currentStep = 'costRange';
            appendMessageWithButtons('bot', 'Please select your cost range:', ['0-15k', '15-30k']);
        } else if (userInfo.officeDesign === 'modern') {
            currentStep = 'costRange';
            appendMessageWithButtons('bot', 'Please select your cost range:', ['30-40k', '40-50k']);
        } else if (userInfo.officeDesign === 'latest') {
            currentStep = 'costRange';
            appendMessageWithButtons('bot', 'Please select your cost range:', ['50-70k', '70-90k']);
        } else {
            currentStep = null;
            appendMessage('bot', `Thank you! The work involves ${userInfo.workScope} on the ${userInfo.renovationType} in your ${userInfo.officeType} with a ${userInfo.officeDesign} design. Is there anything else I can assist you with?`);
        }
    } else if (currentStep === 'costRange' && userInfo.location === 'office') {
        userInfo.costRange = userInput.toLowerCase();
        if (userInfo.officeType === 'cabin') {
            if (userInfo.officeDesign === 'simple' && userInfo.costRange === '0-15k') {
                currentStep = 'selectDesign';
                appendMessage('bot', 'Here are 3 simple POP designs for your office cabin (0-15k):');
                displayImages(simpleDesignImages0_15k.officeCabin);
            } else if (userInfo.officeDesign === 'simple' && userInfo.costRange === '15-30k') {
                currentStep = 'selectDesign';
                appendMessage('bot', 'Here are 3 simple POP designs for your office cabin (15-30k):');
                displayImages(simpleDesignImages15_30k.officeCabin);
            } else if (userInfo.officeDesign === 'modern' && userInfo.costRange === '30-40k') {
                currentStep = 'selectDesign';
                appendMessage('bot', 'Here are 3 modern POP designs for your office cabin (30-40k):');
                displayImages(modernDesignImages30_40k.officeCabin);
            } else if (userInfo.officeDesign === 'modern' && userInfo.costRange === '40-50k') {
                currentStep = 'selectDesign';
                appendMessage('bot', 'Here are 3 modern POP designs for your office cabin (40-50k):');
                displayImages(modernDesignImages40_50k.officeCabin);
            } else if (userInfo.officeDesign === 'latest' && userInfo.costRange === '50-70k') {
                currentStep = 'selectDesign';
                appendMessage('bot', 'Here are 3 latest POP designs for your office cabin (50-70k):');
                displayImages(latestDesignImages50_70k.officeCabin);
            } else if (userInfo.officeDesign === 'latest' && userInfo.costRange === '70-90k') {
                currentStep = 'selectDesign';
                appendMessage('bot', 'Here are 3 latest POP designs for your office cabin (70-90k):');
                displayImages(latestDesignImages70_90k.officeCabin);
            } else {
                currentStep = null;
                appendMessage('bot', `Thank you! The work involves ${userInfo.workScope} on the ${userInfo.renovationType} in your office cabin with a ${userInfo.officeDesign} design within the cost range of ${userInfo.costRange}. Is there anything else I can assist you with?`);
            }
        } else if (userInfo.officeType === 'central area') {
            if (userInfo.officeDesign === 'simple' && userInfo.costRange === '0-15k') {
                currentStep = 'selectDesign';
                appendMessage('bot', 'Here are 3 simple POP designs for your office central area (0-15k):');
                displayImages(simpleDesignImages0_15k.officeCentralArea);
            } else if (userInfo.officeDesign === 'simple' && userInfo.costRange === '15-30k') {
                currentStep = 'selectDesign';
                appendMessage('bot', 'Here are 3 simple POP designs for your office central area (15-30k):');
                displayImages(simpleDesignImages15_30k.officeCentralArea);
            } else if (userInfo.officeDesign === 'modern' && userInfo.costRange === '30-40k') {
                currentStep = 'selectDesign';
                appendMessage('bot', 'Here are 3 modern POP designs for your office central area (30-40k):');
                displayImages(modernDesignImages30_40k.officeCentralArea);
            } else if (userInfo.officeDesign === 'modern' && userInfo.costRange === '40-50k') {
                currentStep = 'selectDesign';
                appendMessage('bot', 'Here are 3 modern POP designs for your office central area (40-50k):');
                displayImages(modernDesignImages40_50k.officeCentralArea);
            } else if (userInfo.officeDesign === 'latest' && userInfo.costRange === '50-70k') {
                currentStep = 'selectDesign';
                appendMessage('bot', 'Here are 3 latest POP designs for your office central area (50-70k):');
                displayImages(latestDesignImages50_70k.officeCentralArea);
            } else if (userInfo.officeDesign === 'latest' && userInfo.costRange === '70-90k') {
                currentStep = 'selectDesign';
                appendMessage('bot', 'Here are 3 latest POP designs for your office central area (70-90k):');
                displayImages(latestDesignImages70_90k.officeCentralArea);
            } else {
                currentStep = null;
                appendMessage('bot', `Thank you! The work involves ${userInfo.workScope} on the ${userInfo.renovationType} in your office central area with a ${userInfo.officeDesign} design within the cost range of ${userInfo.costRange}. Is there anything else I can assist you with?`);
            }
        }
    } else if (currentStep === 'schoolType') {
        userInfo.schoolType = userInput.toLowerCase();
        currentStep = 'schoolDesign';
        appendMessageWithButtons('bot', 'Please select the design type for your ' + userInfo.schoolType + ':', ['Simple', 'Modern', 'Latest']);
    } else if (currentStep === 'schoolDesign') {
        userInfo.schoolDesign = userInput.toLowerCase();
        if (userInfo.schoolDesign === 'simple') {
            currentStep = 'costRange';
            appendMessageWithButtons('bot', 'Please select your cost range:', ['0-15k', '15-30k']);
        } else if (userInfo.schoolDesign === 'modern') {
            currentStep = 'costRange';
            appendMessageWithButtons('bot', 'Please select your cost range:', ['30-40k', '40-50k']);
        } else if (userInfo.schoolDesign === 'latest') {
            currentStep = 'costRange';
            appendMessageWithButtons('bot', 'Please select your cost range:', ['50-70k', '70-90k']);
        } else {
            currentStep = null;
            appendMessage('bot', `Thank you! The work involves ${userInfo.workScope} on the ${userInfo.renovationType} in your ${userInfo.schoolType} with a ${userInfo.schoolDesign} design. Is there anything else I can assist you with?`);
        }
    } else if (currentStep === 'costRange' && userInfo.location === 'school/college') {
        userInfo.costRange = userInput.toLowerCase();
        if (userInfo.schoolType === 'classroom') {
            if (userInfo.schoolDesign === 'simple' && userInfo.costRange === '0-15k') {
                currentStep = 'selectDesign';
                appendMessage('bot', 'Here are 3 simple POP designs for your classroom (0-15k):');
                displayImages(simpleDesignImages0_15k.classroom);
            } else if (userInfo.schoolDesign === 'simple' && userInfo.costRange === '15-30k') {
                currentStep = 'selectDesign';
                appendMessage('bot', 'Here are 3 simple POP designs for your classroom (15-30k):');
                displayImages(simpleDesignImages15_30k.classroom);
            } else if (userInfo.schoolDesign === 'modern' && userInfo.costRange === '30-40k') {
                currentStep = 'selectDesign';
                appendMessage('bot', 'Here are 3 modern POP designs for your classroom (30-40k):');
                displayImages(modernDesignImages30_40k.classroom);
            } else if (userInfo.schoolDesign === 'modern' && userInfo.costRange === '40-50k') {
                currentStep = 'selectDesign';
                appendMessage('bot', 'Here are 3 modern POP designs for your classroom (40-50k):');
                displayImages(modernDesignImages40_50k.classroom);
            } else if (userInfo.schoolDesign === 'latest' && userInfo.costRange === '50-70k') {
                currentStep = 'selectDesign';
                appendMessage('bot', 'Here are 3 latest POP designs for your classroom (50-70k):');
                displayImages(latestDesignImages50_70k.classroom);
            } else if (userInfo.schoolDesign === 'latest' && userInfo.costRange === '70-90k') {
                currentStep = 'selectDesign';
                appendMessage('bot', 'Here are 3 latest POP designs for your classroom (70-90k):');
                displayImages(latestDesignImages70_90k.classroom);
            } else {
                currentStep = null;
                appendMessage('bot', `Thank you! The work involves ${userInfo.workScope} on the ${userInfo.renovationType} in your classroom with a ${userInfo.schoolDesign} design within the cost range of ${userInfo.costRange}. Is there anything else I can assist you with?`);
            }
        } else if (userInfo.schoolType === 'chambers') {
            if (userInfo.schoolDesign === 'simple' && userInfo.costRange === '0-15k') {
                currentStep = 'selectDesign';
                appendMessage('bot', 'Here are 3 simple POP designs for your chambers (0-15k):');
                displayImages(simpleDesignImages0_15k.chambers);
            } else if (userInfo.schoolDesign === 'simple' && userInfo.costRange === '15-30k') {
                currentStep = 'selectDesign';
                appendMessage('bot', 'Here are 3 simple POP designs for your chambers (15-30k):');
                displayImages(simpleDesignImages15_30k.chambers);
            } else if (userInfo.schoolDesign === 'modern' && userInfo.costRange === '30-40k') {
                currentStep = 'selectDesign';
                appendMessage('bot', 'Here are 3 modern POP designs for your chambers (30-40k):');
                displayImages(modernDesignImages30_40k.chambers);
            } else if (userInfo.schoolDesign === 'modern' && userInfo.costRange === '40-50k') {
                currentStep = 'selectDesign';
                appendMessage('bot', 'Here are 3 modern POP designs for your chambers (40-50k):');
                displayImages(modernDesignImages40_50k.chambers);
            } else if (userInfo.schoolDesign === 'latest' && userInfo.costRange === '50-70k') {
                currentStep = 'selectDesign';
                appendMessage('bot', 'Here are 3 latest POP designs for your chambers (50-70k):');
                displayImages(latestDesignImages50_70k.chambers);
            } else if (userInfo.schoolDesign === 'latest' && userInfo.costRange === '70-90k') {
                currentStep = 'selectDesign';
                appendMessage('bot', 'Here are 3 latest POP designs for your chambers (70-90k):');
                displayImages(latestDesignImages70_90k.chambers);
            } else {
                currentStep = null;
                appendMessage('bot', `Thank you! The work involves ${userInfo.workScope} on the ${userInfo.renovationType} in your chambers with a ${userInfo.schoolDesign} design within the cost range of ${userInfo.costRange}. Is there anything else I can assist you with?`);
            }
        } else if (userInfo.schoolType === 'auditorium') {
            if (userInfo.schoolDesign === 'simple' && userInfo.costRange === '0-15k') {
                currentStep = 'selectDesign';
                appendMessage('bot', 'Here are 3 simple POP designs for your auditorium (0-15k):');
                displayImages(simpleDesignImages0_15k.auditorium);
            } else if (userInfo.schoolDesign === 'simple' && userInfo.costRange === '15-30k') {
                currentStep = 'selectDesign';
                appendMessage('bot', 'Here are 3 simple POP designs for your auditorium (15-30k):');
                displayImages(simpleDesignImages15_30k.auditorium);
            } else if (userInfo.schoolDesign === 'modern' && userInfo.costRange === '30-40k') {
                currentStep = 'selectDesign';
                appendMessage('bot', 'Here are 3 modern POP designs for your auditorium (30-40k):');
                displayImages(modernDesignImages30_40k.auditorium);
            } else if (userInfo.schoolDesign === 'modern' && userInfo.costRange === '40-50k') {
                currentStep = 'selectDesign';
                appendMessage('bot', 'Here are 3 modern POP designs for your auditorium (40-50k):');
                displayImages(modernDesignImages40_50k.auditorium);
            } else if (userInfo.schoolDesign === 'latest' && userInfo.costRange === '50-70k') {
                currentStep = 'selectDesign';
                appendMessage('bot', 'Here are 3 latest POP designs for your auditorium (50-70k):');
                displayImages(latestDesignImages50_70k.auditorium);
            } else if (userInfo.schoolDesign === 'latest' && userInfo.costRange === '70-90k') {
                currentStep = 'selectDesign';
                appendMessage('bot', 'Here are 3 latest POP designs for your auditorium (70-90k):');
                displayImages(latestDesignImages70_90k.auditorium);
            } else {
                currentStep = null;
                appendMessage('bot', `Thank you! The work involves ${userInfo.workScope} on the ${userInfo.renovationType} in your auditorium with a ${userInfo.schoolDesign} design within the cost range of ${userInfo.costRange}. Is there anything else I can assist you with?`);
            }
        }
    } else if (currentStep === 'homeArea') {
        userInfo.homeArea = userInput.toLowerCase();
        if (userInfo.homeArea === 'living room') {
            currentStep = 'livingRoomDesign';
            appendMessageWithButtons('bot', 'Please select the living room design:', ['Simple', 'Modern', 'Latest']);
        } else if (userInfo.homeArea === 'bedroom') {
            currentStep = 'bedroomDesign';
            appendMessageWithButtons('bot', 'Please select the bedroom design:', ['Simple', 'Modern', 'Latest']);
        } else if (userInfo.homeArea === 'washroom') {
            currentStep = 'washroomDesign';
            appendMessageWithButtons('bot', 'Please select the washroom design:', ['Simple', 'Modern', 'Latest']);
        } else {
            currentStep = null;
            appendMessage('bot', `Thank you! The work involves ${userInfo.workScope} on the ${userInfo.renovationType} in your ${userInfo.homeArea}. Is there anything else I can assist you with?`);
        }
    } else if (currentStep === 'livingRoomDesign') {
        userInfo.livingRoomDesign = userInput.toLowerCase();
        if (userInfo.livingRoomDesign === 'simple') {
            currentStep = 'costRange';
            appendMessageWithButtons('bot', 'Please select your cost range:', ['0-15k', '15-30k']);
        } else if (userInfo.livingRoomDesign === 'modern') {
            currentStep = 'costRange';
            appendMessageWithButtons('bot', 'Please select your cost range:', ['30-40k', '40-50k']);
        } else if (userInfo.livingRoomDesign === 'latest') {
            currentStep = 'costRange';
            appendMessageWithButtons('bot', 'Please select your cost range:', ['50-70k', '70-90k']);
        } else {
            currentStep = null;
            appendMessage('bot', `Thank you! The work involves ${userInfo.workScope} on the ${userInfo.renovationType} in your living room with a ${userInfo.livingRoomDesign} design. Is there anything else I can assist you with?`);
        }
    } else if (currentStep === 'bedroomDesign') {
        userInfo.bedroomDesign = userInput.toLowerCase();
        if (userInfo.bedroomDesign === 'simple') {
            currentStep = 'costRange';
            appendMessageWithButtons('bot', 'Please select your cost range:', ['0-15k', '15-30k']);
        } else if (userInfo.bedroomDesign === 'modern') {
            currentStep = 'costRange';
            appendMessageWithButtons('bot', 'Please select your cost range:', ['30-40k', '40-50k']);
        } else if (userInfo.bedroomDesign === 'latest') {
            currentStep = 'costRange';
            appendMessageWithButtons('bot', 'Please select your cost range:', ['50-70k', '70-90k']);
        } else {
            currentStep = null;
            appendMessage('bot', `Thank you! The work involves ${userInfo.workScope} on the ${userInfo.renovationType} in your bedroom with a ${userInfo.bedroomDesign} design. Is there anything else I can assist you with?`);
        }
    } else if (currentStep === 'washroomDesign') {
        userInfo.washroomDesign = userInput.toLowerCase();
        if (userInfo.washroomDesign === 'simple') {
            currentStep = 'costRange';
            appendMessageWithButtons('bot', 'Please select your cost range:', ['0-15k', '15-30k']);
        } else if (userInfo.washroomDesign === 'modern') {
            currentStep = 'costRange';
            appendMessageWithButtons('bot', 'Please select your cost range:', ['30-40k', '40-50k']);
        } else if (userInfo.washroomDesign === 'latest') {
            currentStep = 'costRange';
            appendMessageWithButtons('bot', 'Please select your cost range:', ['50-70k', '70-90k']);
        } else {
            currentStep = null;
            appendMessage('bot', `Thank you! The work involves ${userInfo.workScope} on the ${userInfo.renovationType} in your washroom with a ${userInfo.washroomDesign} design. Is there anything else I can assist you with?`);
        }
    } else if (currentStep === 'costRange') {
        userInfo.costRange = userInput.toLowerCase();
        if (userInfo.homeArea === 'living room') {
            if (userInfo.livingRoomDesign === 'simple' && userInfo.costRange === '0-15k') {
                currentStep = 'selectDesign';
                appendMessage('bot', 'Here are 3 simple POP designs for your living room (0-15k):');
                displayImages(simpleDesignImages0_15k.livingRoom);
            } else if (userInfo.livingRoomDesign === 'simple' && userInfo.costRange === '15-30k') {
                currentStep = 'selectDesign';
                appendMessage('bot', 'Here are 3 simple POP designs for your living room (15-30k):');
                displayImages(simpleDesignImages15_30k.livingRoom);
            } else if (userInfo.livingRoomDesign === 'modern' && userInfo.costRange === '30-40k') {
                currentStep = 'selectDesign';
                appendMessage('bot', 'Here are 3 modern POP designs for your living room (30-40k):');
                displayImages(modernDesignImages30_40k.livingRoom);
            } else if (userInfo.livingRoomDesign === 'modern' && userInfo.costRange === '40-50k') {
                currentStep = 'selectDesign';
                appendMessage('bot', 'Here are 3 modern POP designs for your living room (40-50k):');
                displayImages(modernDesignImages40_50k.livingRoom);
            } else if (userInfo.livingRoomDesign === 'latest' && userInfo.costRange === '50-70k') {
                currentStep = 'selectDesign';
                appendMessage('bot', 'Here are 3 latest POP designs for your living room (50-70k):');
                displayImages(latestDesignImages50_70k.livingRoom);
            } else if (userInfo.livingRoomDesign === 'latest' && userInfo.costRange === '70-90k') {
                currentStep = 'selectDesign';
                appendMessage('bot', 'Here are 3 latest POP designs for your living room (70-90k):');
                displayImages(latestDesignImages70_90k.livingRoom);
            } else {
                currentStep = null;
                appendMessage('bot', `Thank you! The work involves ${userInfo.workScope} on the ${userInfo.renovationType} in your living room with a ${userInfo.livingRoomDesign} design within the cost range of ${userInfo.costRange}. Is there anything else I can assist you with?`);
            }
        } else if (userInfo.homeArea === 'bedroom') {
            if (userInfo.bedroomDesign === 'simple' && userInfo.costRange === '0-15k') {
                currentStep = 'selectDesign';
                appendMessage('bot', 'Here are 3 simple POP designs for your bedroom (0-15k):');
                displayImages(simpleDesignImages0_15k.bedroom);
            } else if (userInfo.bedroomDesign === 'simple' && userInfo.costRange === '15-30k') {
                currentStep = 'selectDesign';
                appendMessage('bot', 'Here are 3 simple POP designs for your bedroom (15-30k):');
                displayImages(simpleDesignImages15_30k.bedroom);
            } else if (userInfo.bedroomDesign === 'modern' && userInfo.costRange === '30-40k') {
                currentStep = 'selectDesign';
                appendMessage('bot', 'Here are 3 modern POP designs for your bedroom (30-40k):');
                displayImages(modernDesignImages30_40k.bedroom);
            } else if (userInfo.bedroomDesign === 'modern' && userInfo.costRange === '40-50k') {
                currentStep = 'selectDesign';
                appendMessage('bot', 'Here are 3 modern POP designs for your bedroom (40-50k):');
                displayImages(modernDesignImages40_50k.bedroom);
            } else if (userInfo.bedroomDesign === 'latest' && userInfo.costRange === '50-70k') {
                currentStep = 'selectDesign';
                appendMessage('bot', 'Here are 3 latest POP designs for your bedroom (50-70k):');
                displayImages(latestDesignImages50_70k.bedroom);
            } else if (userInfo.bedroomDesign === 'latest' && userInfo.costRange === '70-90k') {
                currentStep = 'selectDesign';
                appendMessage('bot', 'Here are 3 latest POP designs for your bedroom (70-90k):');
                displayImages(latestDesignImages70_90k.bedroom);
            } else {
                currentStep = null;
                appendMessage('bot', `Thank you! The work involves ${userInfo.workScope} on the ${userInfo.renovationType} in your bedroom with a ${userInfo.bedroomDesign} design within the cost range of ${userInfo.costRange}. Is there anything else I can assist you with?`);
            }
        } else if (userInfo.homeArea === 'washroom') {
            if (userInfo.washroomDesign === 'simple' && userInfo.costRange === '0-15k') {
                currentStep = 'selectDesign';
                appendMessage('bot', 'Here are 3 simple POP designs for your washroom (0-15k):');
                displayImages(simpleDesignImages0_15k.washroom);
            } else if (userInfo.washroomDesign === 'simple' && userInfo.costRange === '15-30k') {
                currentStep = 'selectDesign';
                appendMessage('bot', 'Here are 3 simple POP designs for your washroom (15-30k):');
                displayImages(simpleDesignImages15_30k.washroom);
            } else if (userInfo.washroomDesign === 'modern' && userInfo.costRange === '30-40k') {
                currentStep = 'selectDesign';
                appendMessage('bot', 'Here are 3 modern POP designs for your washroom (30-40k):');
                displayImages(modernDesignImages30_40k.washroom);
            } else if (userInfo.washroomDesign === 'modern' && userInfo.costRange === '40-50k') {
                currentStep = 'selectDesign';
                appendMessage('bot', 'Here are 3 modern POP designs for your washroom (40-50k):');
                displayImages(modernDesignImages40_50k.washroom);
            } else if (userInfo.washroomDesign === 'latest' && userInfo.costRange === '50-70k') {
                currentStep = 'selectDesign';
                appendMessage('bot', 'Here are 3 latest POP designs for your washroom (50-70k):');
                displayImages(latestDesignImages50_70k.washroom);
            } else if (userInfo.washroomDesign === 'latest' && userInfo.costRange === '70-90k') {
                currentStep = 'selectDesign';
                appendMessage('bot', 'Here are 3 latest POP designs for your washroom (70-90k):');
                displayImages(latestDesignImages70_90k.washroom);
            } else {
                currentStep = null;
                appendMessage('bot', `Thank you! The work involves ${userInfo.workScope} on the ${userInfo.renovationType} in your washroom with a ${userInfo.washroomDesign} design within the cost range of ${userInfo.costRange}. Is there anything else I can assist you with?`);
            }
        } else {
            currentStep = null;
            appendMessage('bot', `Thank you! The work involves ${userInfo.workScope} on the ${userInfo.renovationType} in your ${userInfo.homeArea} with a ${userInfo.livingRoomDesign || userInfo.bedroomDesign || userInfo.washroomDesign} design within the cost range of ${userInfo.costRange}. Is there anything else I can assist you with?`);
        }
    } else if (currentStep === 'selectDesign') {
        appendMessage('bot', `You selected the design: ${userInput}. We will proceed with this design our expert will contact you within 10Mins THANK YOU!!!!`);
        currentStep = null;
    } else {
        respondToUser(userInput.toLowerCase());
    }
}

function respondToUser(userInput) {
    let response = responses[userInput] || responses["default"];
    if (userInput === "give info about pop" || userInput === "give description about pop" || userInput === "give defi of pop") {
        response = "The POP is used for interior design.";
    }
    if ((userInput === "hello" || userInput === "hi") && currentStep === null) {
        response = "Hello, how can I assist you today? First, may I know your name?";
        currentStep = 'name';
    }

    setTimeout(() => appendMessage('bot', response), 500);
}

function appendMessage(sender, message) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
    messageElement.innerHTML = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function appendMessageWithButtons(sender, message, options) {
    appendMessage(sender, message);
    const chatBox = document.getElementById('chat-box');
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');
    buttonContainer.style.display = 'flex';
    buttonContainer.style.flexDirection = 'column';
    buttonContainer.style.gap = '8px';
    buttonContainer.style.marginBottom = '8px';

    options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option-button', 'styled-button');
        button.style.width = '100%';
        button.style.padding = '10px';
        button.style.textAlign = 'center';
        button.onclick = () => handleUserInput(option);
        buttonContainer.appendChild(button);
    });

    chatBox.appendChild(buttonContainer);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function displayImages(imageUrls) {
    const chatBox = document.getElementById('chat-box');
    imageUrls.forEach((url, index) => {
        const imgContainer = document.createElement('div');
        imgContainer.style.marginBottom = '10px';

        const img = document.createElement('img');
        img.src = url;
        img.alt = `Design ${index + 1}`;
        img.style.width = '100%';
        img.style.height = 'auto';
        img.style.cursor = 'pointer';
        img.onclick = () => handleUserInput(`Design ${index + 1}`);

        imgContainer.appendChild(img);
        chatBox.appendChild(imgContainer);
    });
    chatBox.scrollTop = chatBox.scrollHeight;
}