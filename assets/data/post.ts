import users from "./data";

export const posts = [
  {
    imageURL:
      "https://media.istockphoto.com/id/1464561797/photo/artificial-intelligence-processor-unit-powerful-quantum-ai-component-on-pcb-motherboard-with.jpg?s=2048x2048&w=is&k=20&c=_h_lwe5-Xb4AK-w3nUfa0m3ZNPDZSqhQhkitrtdTpFQ=",
    user: users[0].username,
    likes: 77,
    caption: "This is my first Post ",
    dp: users[0].image,
    comments: [
      {
        user: users[2].username,
        comment: "Hehe",
      },
      {
        user: users[4].username,
        comment: "HDWkuladhkx,j",
      },
      {
        user: users[6].username,
        comment: "Hello",
      },
    ],
  },
  {
    imageURL:
      "https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=2048x2048&w=is&k=20&c=8QovDK9XochFpaIC-N3pn5EEaRSVuE1SKpQDVUxLSUk=",
    user: users[3].username,
    likes: 27,
    caption: "This is my Post ",
    dp: users[3].image,
    comments: [
      {
        user: users[9].username,
        comment: "Hehe",
      },
      {
        user: users[7].username,
        comment: "HDWkuladhkx,j",
      },
    ],
  },
  {
    imageURL:
      "https://media.istockphoto.com/id/513255037/photo/woman-with-daughter.jpg?s=612x612&w=0&k=20&c=AeGFsr87-B_7gp3jKyU-yhdW9PiRW6M7V30G79y6P8E=",
    user: users[7].username,
    likes: 1127,
    caption: "This is my Post Hehe",
    dp: users[7].image,
    comments: [
      {
        user: users[3].username,
        comment: "Hehe wduskfancgzxh",
      },
      {
        user: users[1].username,
        comment: "HDWkuladhkx,j",
      },
    ],
  },
];
