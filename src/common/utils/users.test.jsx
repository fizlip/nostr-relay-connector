/**
 * @jest-environment node
 */
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import UsersAPI from "./Users"

/**
 * TU1: Get user
 */
test('get user', async() => {
  var us = new UsersAPI()
  us.setParams(["0x1", "steve"])
  var resp = await us.get()
  expect(Object.keys(resp.data)[0]).toBe("User")
});

/**
 * TU2: Create reaction
 */
test('create user', async() => {
  var us = new UsersAPI()
  us.setBody({"Address": "frontend-test-address", "Nick": "frontend-test-nick"})
  var resp = await us.create()
  expect(resp.data).toStrictEqual({})
});

/**
 * TU3: Create reaction
 */
test('delete user item', async() => {
  var us = new UsersAPI()
  us.setBody({"Address": "frontend-test-address", "Nick": "frontend-test-nick"})
  var resp = await us.delete()
  expect(resp.data).toStrictEqual({})
});

/**
 * TU4: Get user by address
 */
test('get user', async() => {
  var us = new UsersAPI()
  us.setParams(["0x1"])
  var resp = await us.getAddress()
  expect(resp.data.User.nick).toBe("steve")
});

/**
 * TU5: Get user by nick 
 */
test('get user', async() => {
  var us = new UsersAPI()
  us.setParams(["steve"])
  var resp = await us.getNick()
  expect(resp.data.User.address).toBe("0x1")
});

/**
 * TU4: Create reaction
 */
test('delete user item', async() => {
  var us = new UsersAPI()
  us.setBody({"Address":"0x1", "Nick":"steve","Column":"Reputation","Value":"1"})
  var resp = await us.update()
  expect(resp.data).toStrictEqual({})
});