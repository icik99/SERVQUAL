# GET ALL SURVEYS
Endpoint : http://localhost:3000/api/survey/

### Success Response
```json
{
  "status": 200,
  "message": "succes retrieved all surveys data!",
  "data": [
    {
      "respondent": {
        "nama": "John Doe",
        "usia": "30",
        "pendidikan": "S1",
        "jenisKelamin": "MALE"
      },
      "id": "324f34ce-cee8-4343-9c53-1b7ba4135b83",
      "tanggal": "2024-07-18T09:55:07.856Z"
    },
    {
      "respondent": {
        "nama": "John Doe",
        "usia": "30",
        "pendidikan": "S1",
        "jenisKelamin": "MALE"
      },
      "id": "3a1e04d9-8372-4067-8453-d4afabc02ef3",
      "tanggal": "2024-07-17T14:39:26.670Z"
    },
    {
      "respondent": {
        "nama": "John Doe",
        "usia": "30",
        "pendidikan": "S1",
        "jenisKelamin": "MALE"
      },
      "id": "63f42963-13b2-4b63-873c-7eb0e5bbb8d5",
      "tanggal": "2024-07-17T15:11:48.929Z"
    }
  ]
}
```


### Response Error
```json
{
    "message": "No Surveys not found",
    "errors": 404
}
```