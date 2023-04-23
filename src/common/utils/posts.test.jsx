/**
 * @jest-environment node
 */
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Post from "./Posts"

/**
 * TPF1: Read all posts on the first page 
 */
test('read posts', async() => {
  const posts = new Post()
  var ps = new Post()
  var resp = await ps.readAll()
  expect(Object.keys(resp.data)[1]).toBe("Posts")
});

/**
 * TPF2: Update an item, set Likes = 1 
 */
test('update likes in existing post', async() => {
  const posts = new Post()
  posts.setBody({
    "creator": "0xtest",
    "date": "1648976915255",
    "column": "Likes",
    "value": "1"
  })

  let response = await posts.update()
  expect(response.data.msg).toBe("Item has been updated")
})

/**
 * TPF3: Create a new post
 */
test('create a new post', async() => {
  const p = new Post() 
  var body = {
    creator: "0xb794f5ea0ba39494ce839613fffba74279579268",
    expectationDate: 0,
    title: "Frontend test",
    abstract: "This is a test post created from a test on the frontend web-app",
    profileUrl: "https://f4-public.s3.eu-central-1.amazonaws.com/sofie.png",
    creatorNick: "skorzeny"
  }
  p.setBody(body)
  let response = await p.create()
  expect(response.data.msg).toBe("Post created.")
})

/**
 * TPF4: Delete a post, will give success message even if 
 * item does not exist.
 */
test("delete a post", async() => {
  const p = new Post()
  const body = {creator: "0xb794f5ea0ba39494ce839613fffba74279579268", date: "1649690652458"}
  p.setBody(body)

  let response = await p.delete()
  expect(response.data.msg).toBe("Deleted Item.")
})

/**
 * TPF5: Test server health check, should say a certain message is healthy.
 */
test("get server status", async() => {
  const p = new Post()

  let response = await p.serviceStatus()
  expect(response.data.msg).toBe("Server is alive! Current environment: Posts")
})

/**
 * TPF6: Read post by ID 
 */
test('read id', async() => {
  var p = new Post()
  const params = ["0xb794f5ea0ba39494ce839613fffba74279579268", "1649690216947"]
  p.setParams(params)
  var resp = await p.readId()
  expect(Object.keys(resp.data)[0]).toBe("Creator")
});

/**
 * TPF7: Read post by ID 
 */
test('read id', async() => {
  var p = new Post()
  const params = ["0xb794f5ea0ba39494ce839613fffba74279579268", "1649690216947"]
  p.setParams(params)
  var resp = await p.readId()
  expect(Object.keys(resp.data)[0]).toBe("Creator")
});

/**
 * TPF8: Read latest post created 
 */
test('read id', async() => {
  var p = new Post()
  var resp = await p.readLatestCreated()
  expect(Object.keys(resp.data)[0]).toBe("Id")
});

/**
 * TPF9: Read the next page 
 */
test('read next page', async() => {
  var p = new Post()
  var params = ["0xb794f5ea0ba39494ce839613fffba74279579268", "1650056287799", "2022-04-15"]
  p.setParams(params)
  var resp = await p.readPage()
  expect(Object.keys(resp.data)[0]).toBe("NextToken")
});