# GET A SURVEY BY ID
Endpoint : http://localhost:3000/api/survey/:id

### Success Response
```json
{
    "status": 200,
    "message": "succes retrieved survey data!",
    "data": {
        "tanggal": "2024-07-17T14:39:26.670Z",
        "respondent": {
            "nama": "John Doe",
            "usia": "30",
            "jenisKelamin": "MALE",
            "pendidikan": "S1"
        },
        "result": [
            {
                "dimension": "Emphaty",
                "expectation": [
                    1, 4, 2, 3
                ],
                "perception": [
                    3, 6, 4, 5
                ]
            },
            {
                "dimension": "Reability",
                "expectation": [
                    3, 1, 4, 2
                ],
                "perception": [
                    3, 1, 5, 4
                ]
            },
            {
                "dimension": "Tangible",
                "expectation": [
                    1, 4, 3, 2
                ],
                "perception": [
                    6, 4, 3, 5
                ]
            },
            {
                "dimension": "Responsiveness",
                "expectation": [
                    4, 3, 1, 2
                ],
                "perception": [
                    5, 4, 3, 6
                ]
            },
            {
                "dimension": "Assurance",
                "expectation": [
                    3, 1, 2, 4
                ],
                "perception": [
                    5, 4, 6, 3
                ]
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