export function buildATSPrompt(query: string): string {
  return `
After doing research on the 2026 software developer market, I need you to create json representation of this model for the keyword: ${query}. Normalize the name to a standard industry format (Title Case, expand common abbreviations like JS → JavaScript, keep widely accepted acronyms like HTML unchanged)
model Keyword {
  id         Int      @id @default(autoincrement())
  name       String @unique
  category   Category 
  skillType  String   
  importance Rating 
  bulletLinks BulletKeyword[]
} 

where, the Category is defined as, Choose the primary/most representative category in job postings.
enum Category {
  FRONTEND
  BACKEND
  DEVOPS
  DATA
  ML
  MANAGEMENT
  DESIGN
  TESTING
  OTHER
} 

and skill type is defined as, Use HARD for technical skills and SOFT for interpersonal/organizational skills.

enum SkillType {
  HARD
  SOFT
}

and Rating defined as. where Importance should reflect demand in the 2026 job market on a scale of ZERO–TEN, where TEN = essential/core skill across most roles.

enum Rating {
	ZERO
	ONE
	TWO
	THREE
	FOUR
	FIVE
	SIX
	SEVEN
	EIGHT
	NINE
	TEN
}

return only valid JSON. No explanations.
  `;
}

export function buildBulletPointPrompt(query: string): string {
	return `
	After doing research on the 2026 software developer market, I need you to create json representation of this bulletpoint model for the keyword: ${query}.
	model BulletPointPrompt {
	  id      Int    @id @default(autoincrement())
	  content String

	  projectId    Int
	  projectType  ProjectType
	  project      Project         @relation(fields: [projectId], references: [id]) // or relation if you expand later
	  job          String?
	  category     String
	  skillType    String
	  keywordLinks Keyword[]
	}
	content describes a task that most likely was done with the provided project using the provided keyword. make this a brief but informative bulletpoint describing a task done in the project, using keyword which achieve some metric of improvement most relevant to the project and keyword.

	project being the project the bulletpoint is for, with the project being,
	${project}
	
	catergory is the best fitting category out of this enum,
	enum Category {
	  FRONTEND
	  BACKEND
	  DEVOPS
	  DATA
	  ML
	  MANAGEMENT
	  DESIGN
	  TESTING
	  OTHER
	}

	skill Type describes the type of skill the bulletpoint describes should also be related to the ats keyword provided,
	enum SkillType {
	  HARD
	  SOFT
	}	
	
	keywordLinks are other keywords that might be associated with the bulletpoint, you can take these from the list contained within the project. Normalize the name to a standard industry format (Title Case, expand common abbreviations like JS → JavaScript, keep widely accepted acronyms like HTML unchanged)
	
	return only valid JSON. No explanations.	
  `;
}

export const descriptionATSPrompt =  `
Can you provide me with a list of the high signal most have ats keywords for the following job description. 

	I would like for the response to be in a json format with a key - value pairing.

	keys are the following categories,

	enum Category {
	  FRONTEND
	  BACKEND
	  DEVOPS
	  DATA
	  ML
	  MANAGEMENT
	  DESIGN
	  TESTING
	  OTHER
	}

	values normalize the name to a standard industry format (Title Case, expand common abbreviations like JS → JavaScript, keep widely accepted acronyms like HTML unchanged), sorted by importance
	
	Only return valid json.
`


