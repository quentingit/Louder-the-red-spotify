import * as functions from "../functions"
// @ponicode
describe("functions.formatFollowers", () => {
    test("0", () => {
        let result: any = functions.formatFollowers(500)
        expect(result).toBe("500 followers")
    })

    test("1", () => {
        let result: any = functions.formatFollowers(1001)
        expect(result).toBe("1.0k followers")
    })

    test("2", () => {
        let result: any = functions.formatFollowers(5000000)
        expect(result).toBe("5.0M followers")
    })

    test("3", () => {
        let result: any = functions.formatFollowers(101400)
        expect(result).toBe("101.0k followers")
    })

    test("4", () => {
        let result: any = functions.formatFollowers(999)
        expect(result).toBe("999 followers")
    })
})

// @ponicode
describe("functions.formatDescription", () => {
    test("0", () => {
        let result: any = functions.formatDescription("ceci est une description tres longue de plus de 60 caractères")
        expect(result).toBe("ceci est une description tres longue de plus de 60 caractères...")
    })

    test("1", () => {
        let result: any = functions.formatDescription("ceci est une description classique")
        expect(result).toBe("ceci est une description classique")
    })
})
