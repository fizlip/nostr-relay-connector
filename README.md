# GRASSR00T
GRASSR00T is a decentralized messaging platform which allows anyone in the world to connect to a *nostr relay* making it possible for open source investigators a clear view into the social and political life in places where the government censors internet applications like Twitter/Instagram/TikTok. It was inspired by the needs of open source reasearhes discussed in [this](https://www.bellingcat.com/resources/2023/04/18/china-challenges-open-source-osint-social-media/) article

I made it as part of the 2023 bellingcat accessability hackathon and had a lot of fun 😀.

## Team Members
[Filip Zlatoidsky](https://github.com/fizlip)
## Tool Description

When conducting reasearch in countries where government censorship and persecution is ... the need for anonymity is obvious. However, the tools that exist today to message with primary sources anonymously are few and often centralized and easy to censor. 

**nostr** is a novel communication protocol which you can read more about [here](https://nostr.com/). Basically it's a very simple communication protocol consisting of *clients*, and *relays*. The relays act as servers in the classical client-server architecture the major difference here is that the relays are decentralized meaning anyone in the world can create their own relays. 

As part of this hackathon I implemented my own relay using some open source libraries, but as this is a tool intended to be used by non-technical people this repo only contains the code used to make the web-app used to connect to said relay and any other relay that exists.

## Installation
To interact with a relay installation or technical 'know-how' is needed just go to the [website](https://nostr-relay-connector-n655.vercel.app/)

To create a public/private self-hosted relay (e.g. if you basically want a self-hosted censorship resistant discord server) you will need a server (a raspberrypi works fine but you could use an EC2 isntance as well). On the server you create a relay which can parse the nostr messages e.g. [strfry](https://github.com/hoytech/strfry) written in c++ or find any other one you like. You then host this relay on you domain and you can connect to it using GRASSR00T. 

## Usage

Currently GRASSR00T has 2 main functionalities:

### Connect to relay
To connect to a relay you can write the URL of the relay you want, since you are connecting to them using web sockets you need to write the URL in the format wss://your-relay-url.com . You can find some popular relays [here](https://nostr.watch/relays/find)
### Write message
To publish a message just write a text in the textarea on the top of the screen.

## Additional Information
The next steps would be to make app support multimedia content i.e. allowing users to post videos, images and other fileformats. The end goal would be to make this into a decentralized discord/signal type of thing where anyone in the world could easily with a couple of click spin up their own relay that would allow to the create a room online outside of view of the prying eyes of the state.
