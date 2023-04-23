# GRASSR00T
GRASSR00T is a decentralized messaging platform which allows anyone in the world to connect to a *nostr relay* making it possible for open source investigators to get a clear view into the social and political life in places where the government censors internet applications like Twitter/Instagram/TikTok. It was inspired by the needs of open source reasearhes discussed in [this](https://www.bellingcat.com/resources/2023/04/18/china-challenges-open-source-osint-social-media/) article

I made it as part of the 2023 bellingcat accessability hackathon and had a lot of fun 😀.

## Team Members
[Filip Zlatoidsky](https://github.com/fizlip)
## Tool Description

When conducting reasearch in countries where government censorship and persecution is wide spread the need for anonymity is obvious. However, the 'anonymous' messaging platforms that exist today are few and often centralized and easy to censor. 

**nostr** is a novel communication protocol (which has existed for less than 1 year) which you can read more about [here](https://nostr.com/). Basically it's a simple protocol aiming at demosratizing social media. The nostr network consists of *clients*, and *relays*. The relays act as servers in the classical client-server architecture. The major difference here is that the clients are indifferent to which relay they connect to meaning that anyone can spin up a relay effectively making their own social media platform. nostr is decentralized, meaning anyone in the world can participate in the network. It is also censorhip resistant, since when one relay is blocked one can simply migrate this to a new domain/IP making it harder (though not impossible) to censor. 

As part of this hackathon I implemented my own relay using some open source libraries, but as this is a tool intended to be used by non-technical people this repo only contains the code used to make the web-app used to connect to said relay and any other relay that exists.

## Installation
To interact with a relay installation or technical 'know-how' is needed just go to the [website](https://nostr-relay-connector-n655.vercel.app/)

To create a public/private self-hosted relay (e.g. if you basically want a self-hosted censorship resistant discord server) you will need a server (a raspberrypi works fine but you could use an EC2 isntance as well). On the server you create a relay which can parse the nostr messages e.g. [strfry](https://github.com/hoytech/strfry) written in c++ or find any other one you like. You then host this relay on you domain and you can connect to it using GRASSR00T. 

## Usage

The intended usage of this web-app is for investigators to be able to connect to relays located in countries with high internet censorhip. An investigator will be given a URL, connect to the relay and then use the website much like Twitter or Discord.

Currently GRASSR00T has 2 main functionalities:

### Connect to relay
To connect to a relay you can write the URL of the relay you want in the right sidebar textarea, since relays are based on websocket we connect to them using a URL in the format wss://your-relay-url.com . You can find some popular relays [here](https://nostr.watch/relays/find)
### Write message
To publish a message just write a text in the textarea on the top of the screen.

## Additional Information
The next steps would be to make app support multimedia content i.e. allowing users to post videos, images and other fileformats. The end goal would be to make this into a decentralized discord/signal type of thing where anyone in the world could easily with a couple of clicks spin up their own relay that would allow to the create a room online outside of the view of the prying eyes of the state.
