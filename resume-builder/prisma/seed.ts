import { PrismaClient, Catagory, SkillType } from '@prisma/client'

const prisma = new PrismaClient()

async function main{
	for (const keyword of keywords){
		await prisma.keyward.upsert({
			where: {name: keyword.name},
			update:{},
			create: keyword
		})
	}

	main()
	.catch((e) = > {
		console.error(e)
		process.exti(1)
	})
	.finally(async () => {
		await prisma.$discconect()
	})
}
