Josh?Ishara?dev22Netacad

## Basics of networking
> A network is just a collection of devices and end systems connected to each other and able to communicate with each other.
> A network could be as large as the internet or as small as your two computers at home sharing files and a printer.

### Network components
- Personal Computers: endpoint of your network, sending and receiving data
- Interconnections: components that make sure data can travel from one device to another such:
	1. Network cards: they translate data from your computer in a readable format for the network
	2. Media: network cables, perhaps wireless
	3. connectors: the plug you plug in your network card
- Switches: provide a network connection for your end devices like PC's
- Routers: interconnect networks and choose the best path to each network destination![[Screenshot from 2024-06-14 14-32-44.png]]

### We use network for?
1. Applications: Sending data between computers, sharing files.
2. Resources: Network printers, network cameras.
3. Storage: Using a NAS (Network attached storage) will make your storage available on the network. 
4. Backup: Using a central backup server where all computers send their data to for backup. 
5. VoIP: Voice over IP is becoming more important and every day and replacing analog telephony.

### Physical topology
The physical topology is what the network looks like and how all the cables and devices are connected to each other. 

### Logical topology
The logical topology is the path our data signals take through the physical topology.

## OSI Model
> In the beginning the development of networks was chaotic. Each vendor had its own proprietary solution. The bad part was that one vendor‟s solution was not compatible with another vendor‟s solution. This is where the idea for the OSI-model was born, having a layered approach to networks our hardware vendors would design hardware for the network, and others could develop software for the application layer. Using an open model which everyone agrees on means we can build networks that are compatible with each other.

![[Screenshot from 2024-06-14 15-05-04.png]]

1. Physical Layer: This layer describes stuff like voltage levels, timing, physical data rates, physical connectors and so on.
2. Data Link: This layer makes sure data is formatted the correct way, takes care of error detection and makes sure data is delivered reliably. This might sound a bit vague now, for now try to remember this is where “Ethernet” lives. MAC Addresses and Ethernet frames are on the Data Link layer.
3. Network: This layer takes care of connectivity and path selection (routing). This is where IPv4 and IPv6 live.
4. Transport: The transport layer takes care of transport, when you downloaded this book from the Internet the file was sent in segments and transported to your computer. 

		1. TCP lives here; it‟s a protocol which send data in a reliable way. 
		2. UDP lives here; it‟s a protocol which sends data in an unreliable way.
5. Session: The session layer takes care of establishing, managing and termination of sessions between two hosts.
6. Presentation: This one will make sure that information is readable for the application layer by formatting and structuring the data. Most computers use the ASCII table for characters. If another computer would use another character like EBCDIC than the presentation layer needs to “reformat” the data so both computers agree on the same characters.
7. Application: Here are your applications. E-mail, browsing the web (HTTP), FTP and many more.
![[Screenshot from 2024-06-14 15-14-41.png]]
