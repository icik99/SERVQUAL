# GET A SURVEY BY ID
Endpoint : http://localhost:3000/api/survey/:id

### Success Response
```json
{
  "status": 200,
  "message": "succes retrieved survey data!",
  "data": {
    "tanggal": "2024-07-19T12:34:41.008Z",
    "respondent": {
      "nama": "Mario",
      "usia": "30",
      "jenisKelamin": "MALE",
      "pendidikan": "S1"
    },
    "result": [
      {
        "dimension": "Emphaty",
        "average": {
          "expectation": 2.5,
          "perception": 4.5
        },
        "gap": 2,
        "interpretation": "Kelebihan / Keunggulan Layanan"
      },
      {
        "dimension": "Responsiveness",
        "average": {
          "expectation": 2.5,
          "perception": 4.5
        },
        "gap": 2,
        "interpretation": "Kelebihan / Keunggulan Layanan"
      },
      {
        "dimension": "Reability",
        "average": {
          "expectation": 2.5,
          "perception": 3.25
        },
        "gap": 0.75,
        "interpretation": "Kelebihan / Keunggulan Layanan"
      },
      {
        "dimension": "Tangible",
        "average": {
          "expectation": 4,
          "perception": 1
        },
        "gap": -3,
        "interpretation": "Memerlukan Perhatian Khusus"
      },
      {
        "dimension": "Assurance",
        "average": {
          "expectation": 2.5,
          "perception": 4.5
        },
        "gap": 2,
        "interpretation": "Kelebihan / Keunggulan Layanan"
      }
    ]
  }
}
```

### Error Response
```json
{
    "message": "Survey not found.",
    "errors": 404
}
```