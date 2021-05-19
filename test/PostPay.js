const { assert } = require("chai")
const { default: Web3 } = require("web3")

const PostPay = artifacts.require('./PostPay.sol')

require("chai").use(require('chai-as-promised')).should()

contract('PostPay', ([deployer, author, tiper]) => {
    let postPay

    before(async () => {
        postPay = await PostPay.deployed()
    })
    describe('deployment', async () => {
        it('deploys successfully', async () => {
            const address = await postPay.address
            assert.notEqual(address, 0x0)
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
        })

        it('has a name', async () => {
            const name = await postPay.name()
            assert.equal(name, 'Masterbid Post Pay')
        })
    })

    

    describe('posts', async () => {
        let result, postCount

        before(async () => {
            result = await postPay.createPost("First official post", { from: author })
            postCount = await postPay.postCount()
        })
        it('creates posts', async() => {

            // Success
            assert.equal(postCount, 1)
            const event = result.logs[0].args
            assert.equal(event.id.toNumber(), postCount.toNumber(), 'id is correct')
            assert.equal(event.content, 'First official post', 'content is correct')
            assert.equal(event.tipAmount, '0', 'tip amount is correct')
            assert.equal(event.author, author, 'author is correct')
            
            // Failure case
            await postPay.createPost("", { from: author }).should.be.rejected;
        })
        it('lists posts', async () => {
            const post = await postPay.posts(postCount)
            assert.equal(post.id.toNumber(), postCount.toNumber(), 'id is correct')
            assert.equal(post.content, 'First official post', 'content is correct')
            assert.equal(post.tipAmount, '0', 'tip amount is correct')
            assert.equal(post.author, author, 'author is correct')
        })

        it('allow users to tip posts', async () => {
            
            let oldAuthorBalance
            oldAuthorBalance = await web3.eth.getBalance(author)
            oldAuthorBalance = new web3.utils.BN(oldAuthorBalance)

            result = await postPay.tipPost(postCount, { from: tiper, value: web3.utils.toWei('1', 'ether')});
            const event = result.logs[0].args
            assert.equal(event.id.toNumber(), postCount.toNumber(), 'id is correct')
            assert.equal(event.content, 'First official post', 'content is correct')
            assert.equal(event.tipAmount, '1000000000000000000', 'tip amount is correct')
            assert.equal(event.author, author, 'author is correct')

            // Check that author receives fund
            let newAuthorBalance
            newAuthorBalance = await web3.eth.getBalance(author)
            newAuthorBalance = new web3.utils.BN(newAuthorBalance)

            let tipAmount
            tipAmount = web3.utils.toWei('1', 'ether')
            tipAmount = new web3.utils.BN(tipAmount)

            const expectedBalance = oldAuthorBalance.add(tipAmount)
            assert.equal(newAuthorBalance.toString(), expectedBalance.toString())

            // Try to tip a post that doesn't exist
            await postPay.tipPost(99, { from: tiper, value: web3.utils.toWei('1', 'Ether')}).should.be.rejected;












        })
    })
})