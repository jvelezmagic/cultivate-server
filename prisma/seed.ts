import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const questions = [
    {
      title:
        'Tell me about a time when you had to adapt to a new work environment or situation.',
      goals: { set: ['Adaptability', 'Problem-solving skills', 'Teamwork'] },
    },
    {
      title:
        'How do you handle conflicts or disagreements with your coworkers or superiors?',
      goals: {
        set: [
          'Conflict resolution',
          'Communication skills',
          'Emotional intelligence',
        ],
      },
    },
    {
      title: 'What motivates you in your work?',
      goals: { set: ['Work ethic', 'Values alignment', 'Goal orientation'] },
    },
    {
      title:
        'Describe a time when you had to work with a difficult team member. How did you handle the situation?',
      goals: { set: ['Teamwork', 'Leadership skills', 'Conflict resolution'] },
    },
    {
      title:
        'What do you consider to be your biggest strength and weakness as an employee?',
      goals: { set: ['Self-awareness', 'Honesty', 'Goal orientation'] },
    },
    {
      title:
        'Tell me about a time when you had to think creatively to solve a problem at work.',
      goals: { set: ['Problem-solving skills', 'Innovation', 'Adaptability'] },
    },
    {
      title: 'How do you handle stressful or high-pressure situations?',
      goals: {
        set: [
          'Stress management',
          'Emotional intelligence',
          'Problem-solving skills',
        ],
      },
    },
    {
      title:
        'What are your career goals, and how do they align with the values of our company?',
      goals: {
        set: ['Goal orientation', 'Values alignment', 'Career development'],
      },
    },
    {
      title:
        'Tell me about a time when you went above and beyond in your work.',
      goals: { set: ['Work ethic', 'Leadership skills', 'Goal orientation'] },
    },
    {
      title:
        'What is your preferred work style, and how do you ensure that you are productive and efficient?',
      goals: { set: ['Work style', 'Time management', 'Productivity'] },
    },
  ];

  /// Create 5 candidates
  await prisma.user.createMany({
    data: [
      {
        email: 'auto-generated-candidate-1@gmail.com',
        password: '1234567890',
        avatarUrl:
          'https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1985&q=80',
      },
      {
        email: 'auto-generated-candidate-2@gmail.com',
        password: '1234567890',
        avatarUrl:
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80',
      },
      {
        email: 'auto-generated-candidate-3@gmail.com',
        password: '1234567890',
        avatarUrl:
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
      },
      {
        email: 'auto-generated-candidate-4@gmail.com',
        password: '1234567890',
        avatarUrl:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80',
      },
      {
        email: 'auto-generated-candidate-5@gmail.com',
        password: '1234567890',
        avatarUrl:
          'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80',
      },
    ],
    skipDuplicates: true,
  });

  await prisma.user.upsert({
    where: { email: 'auto-generated-company-member-1@gmail.com' },
    update: {},
    create: {
      email: 'auto-generated-company-member-1@gmail.com',
      password: '1234567890',
      avatarUrl:
        'https://cultivate-pink.vercel.app/static/media/bootstrap.bd712487.jpg',
      company: {
        create: {
          name: 'Argon Design System',
          avatarUrl:
            'https://cultivate-pink.vercel.app/static/media/bootstrap.bd712487.jpg',
          description:
            'Argon is a great free UI package based on Bootstrap 4 that includes the most important components and features.',
          questions: {
            createMany: {
              data: questions,
              skipDuplicates: true,
            },
          },
        },
      },
    },
  });

  await prisma.user.upsert({
    where: { email: 'jane.doe@example.com' },
    update: {},
    create: {
      email: 'jane.doe@example.com',
      password: 'password123',
      avatarUrl: 'https://example.com/avatar/jane.doe',
      company: {
        create: {
          name: 'Black Dashboard Sketch',
          avatarUrl:
            'https://cultivate-pink.vercel.app/static/media/sketch.a6af780a.jpg',
          description:
            'Black Dashboard Sketch is a beautiful resource built over the popular Bootstrap 4 framework. It will help you create a clean and simple dashboard. It is fully responsive and designed by using the best practices.',
          questions: {
            createMany: {
              data: questions,
              skipDuplicates: true,
            },
          },
        },
      },
    },
  });

  await prisma.user.upsert({
    where: { email: 'john.smith@example.com' },
    update: {},
    create: {
      email: 'john.smith@example.com',
      password: 'password123',
      avatarUrl: 'https://example.com/avatar/john.smith',
      company: {
        create: {
          name: 'React Material Dashboard',
          avatarUrl:
            'https://cultivate-pink.vercel.app/static/media/react.0e8c9066.jpg',
          description:
            "React Material Dashboard is a free Material-UI Admin with a fresh, new design inspired by Google's Material Design.",
          questions: {
            createMany: {
              data: questions,
              skipDuplicates: true,
            },
          },
        },
      },
    },
  });

  await prisma.user.upsert({
    where: { email: 'mike.williams@example.com' },
    update: {},
    create: {
      email: 'mike.williams@example.com',
      password: 'password123',
      avatarUrl: 'https://example.com/avatar/mike.williams',
      company: {
        create: {
          name: 'React Material Dashboard',
          avatarUrl:
            'https://cultivate-pink.vercel.app/static/media/vue.43bd93a8.jpg',
          description:
            'Vue Paper Dashboard is a beautiful resource built over Bootstrap 4 and Vue.js. It will help you get started developing dashboards in no time. Vue Paper Dashboard is the official Vuejs version of the Original Paper Dashboard.',
          questions: {
            createMany: {
              data: questions,
              skipDuplicates: true,
            },
          },
        },
      },
    },
  });
}

main()
  .then(() => {})
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
