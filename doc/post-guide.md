

# POST A SURVEY
Endpoint : http://localhost:3000/api/survey

body : raw - json

```json
{
  "nama": "John Doe",
  "jenisKelamin": "MALE",
  "pendidikan": "S1",
  "usia": "30",
  "surveyResult" : [
    {
      "dimension" : "Tangible",
      "answer" : {
        "expectation" : [1,2,3,4],
        "perception" : [3,4,5,6]
        }
    },
    {
      "dimension" : "Reability",
      "answer" : {
        "expectation" : [1,2,3,4],
        "perception" : [3,4,5,6]
      }
    },
    {
      "dimension" : "Responsiveness",
      "answer" : {
        "expectation" : [1,2,3,4],
        "perception" : [3,4,5,6]
      }
    },
    {
      "dimension" : "Assurance",
      "answer" : {
        "expectation" : [1,2,3,4],
        "perception" : [3,4,5,6]
      }
    },
    {
      "dimension" : "Emphaty",
      "answer" : {
        "expectation" : [1,2,3,4],
        "perception" : [3,4,5,6]
      }
    }
  ]
}
```

### Success Response : 
```json
{
    "status": 200,
    "message": "thanks for submitted survey!",
    "data": {
        "nama": "John Doe",
        "jenisKelamin": "MALE",
        "pendidikan": "S1",
        "survey": {
            "tanggal": "2024-07-17T14:58:52.799Z",
            "id": "d9f624eb-b75f-4211-ab27-a0e0a54378aa"
        }
    }
}
```

### Error Response (example)
```json
{
    "message": "jenisKelamin is a required field",
    "errors": 400
}
```

