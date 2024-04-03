import { prisma } from '@/lib/prisma'

async function seed() {
  await prisma.event.create({
    data: {
      id: 'a747d00b-eef9-4290-9ac0-a94a16549083',
      title: 'Unite Summit',
      slug: 'unite-summit',
      details: 'A conference for developers',
      maximumAttendees: 120,
    },
  })
}

seed().then(() => {
  console.log('Seed complete')
  prisma.$disconnect()
})
