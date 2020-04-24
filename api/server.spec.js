const request = require('supertest');

const server = require('./server.js')

describe('server check', function () {
    describe('Get / from base', function(){
        it("should return 200", function (){
            return request(server)
              .get("/")
              .then(res => {
                  expect(res.status).toBe(200)
              })
        })

        it("should return a message", function () {
            return request(server)
            .get("/")
            .then(res => {
              expect(res.body.message).toBe("Server is running")
            })
        })
    })
}) 