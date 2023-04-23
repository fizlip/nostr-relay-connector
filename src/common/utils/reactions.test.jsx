/**
 * @jest-environment node
 */
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import ReactionAPI from "./Reactions"

/**
 * TR1: Get reaction
 */
test('get reaction', async() => {
  var rs = new ReactionAPI()
  rs.setParams(["0x000", "test"])
  var resp = await rs.get()
  expect(Object.keys(resp.data)[0]).toBe("Reaction")
});

/**
 * TR2: Create reaction
 */
test('create reaction', async() => {
  var rs = new ReactionAPI()
  rs.setBody({Address: "frontend-test-postid", PostId: "frontend-test-postid", Type:"1"})
  var resp = await rs.create()
  expect((resp.data)).toStrictEqual({})
});

/**
 * TR3: Delete reaction
 */
test('delete reaction', async() => {
  var rs = new ReactionAPI()
  rs.setBody({"Address": "frontend-test-postid", "PostId": "frontend-test-postid"})
  var resp = await rs.delete()
  expect((resp.data)).toStrictEqual({})
});