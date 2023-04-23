/**
 * @jest-environment node
 */
import '@testing-library/jest-dom'
import Comments from "./Comments"

/**
 * TCF1: Read all comments on a post
 */
test('read comments', async() => {
  var ps = new Comments()
  ps.setParams(["p1"])
  var resp = await ps.getPost()
  expect(Object.keys(resp.data)[0]).toBe("Comments")
});

/**
 * TCF2: Create a comment
 */
test('create comments', async() => {
  var ps = new Comments()
  ps.setBody({
      "postid": "tp1",
      "commentid": "tc1",
      "content": "This is a test comment",
      "creator": "0x0000"

  })
  var resp = await ps.create()

  expect(resp.data.msg).toBe("Comment created.")
});

/**
 * TCF3: Get ID 
 */
test('read comments by id', async() => {
  var ps = new Comments()
  ps.setParams(["tp1", "tc1"])
  var resp = await ps.getID()
  expect(resp.data.Content).toBe("This is a test comment")
});

/**
 * TCF4: Update comment
 */
test('update comment', async() => {
  var ps = new Comments()
  ps.setBody({
      "postid": "tp1",
      "commentid": "tc1",
      "column": "Content",
      "value": "this is an update to a post that was just created",
  })
  var resp = await ps.update()
  expect(resp.data.msg).toBe("Item has been updated")
});

/**
 * TCF5: Delete comment 
 */
test('delete comment', async() => {
  var ps = new Comments()
  ps.setBody({"PostID": "tp1", "CommentID": "tc1"})
  var resp = await ps.delete()
  expect(resp.data.msg).toBe("Deleted Item.")
});