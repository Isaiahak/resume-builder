export const descriptionResponse = {
	"type": "object",
	"properties": {
		"FRONTEND": { type: "array", item:{ type:"string"} },
		"backend": { type: "array", item:{ type:"string"} },
		"devops": { type: "array", item:{ type:"string"} },
		"data": { type: "array", item:{ type:"string"} },
		"ml": { type: "array", item:{ type:"string"} },
		"management": { type: "array", item:{ type:"string"} },
		"design": { type: "array", item:{ type:"string"} },
		"testing": { type: "array", item:{ type:"string"} },
		"other": { type: "array", item:{ type:"string"} },
	},
	"additionalProperties": false,
	"required": ["frontend","backend","devops","data","ml","management","design","testing","other"]
}


