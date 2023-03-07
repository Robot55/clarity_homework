const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const rolesData = [
  {
    name: 'Misc',
    description: 'general employee'
  },
  {
    name: 'WAITER',
    description: 'waiter or waitress'
  },
  {
    name: 'MANAGER'
  },
  {
    name: 'COOK',
    description: 'chef, sous chef, line cook, assistant cook, etc.'
  },
  {
    name: 'BUSSER'
  },
  {
    name: 'HOST'
  },
  {
    name: 'BARTENDER'
  },
  {
    name: 'BARISTA'
  },
  {
    name: 'DISHWASHER'
  },
  {
    name: 'SECURITY',
    description: 'doorman, bouncer, night watchman, etc.'
  },

]
const userData = [
  {
    name: 'Alice',
    email: 'alice@some-email.io',
    job_id: 2
  },
  {
    name: 'Nilu',
    email: 'nilu@prisma.io',
    employment_start_date: new Date('2018-04-04'),
    currently_employed: false,
    job_id: 2
  },
  {
    name: 'Lenny',
    email: 'lenny@email.io',
    employment_start_date: new Date('2019-03-11'),
    job_id: 3
  },
  {
    name: 'Dave',
    email: 'dave@davemail.com',
    employment_start_date: new Date('2020-03-11'),
    job_id: 4
  },
  {
    name: 'Mahmoud',
    email: 'mahmoud@prisma.io',
    job_id: 5
  },
  {
    name: 'Benjy',
    email: 'brnjy@prisma.io'
  },
  {
    name: 'Clarice',
    email: 'clar1@prisma.io'
  },
  {
    name: 'Johnny',
    email: 'jj@prisma.io',
  },


]

async function main() {
  console.log(`Start seeding ...`)
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    })
    console.log(`Created user with id: ${user.id}`)
  }
  for (const r of rolesData) {
    const role = await prisma.role.create({
      data: r,
    })
    console.log(`Created role of "${role.name}" with id: ${role.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
