
'use client';

import socket from "@/lib/socket/client";
import { Dispatch, useEffect, useState } from "react";
import { useWallet } from "@/lib/wallet/Usewallet";
import EmojiPicker from "@/components/EmojiPicker";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from 'axios'
import Link from "next/link";
interface Message {
    from: string;
    message: string;
    time: string
}

export default function ChatPage() {
    const { address, isConnected, disconnect, ensName } = useWallet();
    const [showContactform, setshowContactform] = useState(false);
    const [walletAddress, setwalletAddress] = useState("");
    const [chatRequests, setchatRequests] = useState<string[]>([]);
    const [acceptedRequests, setacceptedRequests] = useState<{ address: string, socketId: string | null }[]>([]);
    const [recipient, setRecipient] = useState<{ address: string, socketId: string | null } | null>(null);


    const Router = useRouter()
    console.log(address);

    const [messages, setMessages] = useState<Message[]>([]);
    const [messageInput, setMessageInput] = useState('');
    console.log(messages);

    console.log(acceptedRequests);
    // Fetching Messages

    const fetchMessages = async () => {
        if (!address || !recipient?.address) return;
        try {
            const res = await axios.post('/api/fetchmessages', {
                from: address.toLowerCase(),
                to: recipient.address.toLowerCase()
            });

            setMessages(res.data.messages);
        } catch (error) {
            console.error("❌ Error fetching messages:", error);
            toast.error("Could not fetch chat history.");
        }
    };


    useEffect(() => {
        if (isConnected) {
            fetchMessages()
        }
    }, [isConnected]);




    // Incoming chat requests


    useEffect(() => {
        const handleIncomingChatRequest = ({ from }: { from: string }) => {
            console.log("📩 Incoming chat request from:", from);
            setchatRequests(prev => [...prev, from]);
        };

        socket.on('incoming-chat-request', handleIncomingChatRequest);

        return () => {
            socket.off('incoming-chat-request', handleIncomingChatRequest);
        };
    }, [chatRequests]);

    //  Fething Accepted chat requests

    useEffect(() => {
        if (isConnected) {
            console.log(acceptedRequests);

            socket.on('chat-request-accepted', ({ by, socketId }) => {
                setacceptedRequests(prev => [...prev, { address: by, socketId }]);
            });

        }
        return () => {
            socket.off("chat-request-accepted")
        }
    }, [isConnected])

    useEffect(() => {
        if (!socket.connected) {
            socket.connect();
            console.log("🔌 Connecting socket...");
        }

        const handleConnect = () => {
            console.log('✅ Socket connected:', socket.id);
            if (address) {
                socket.emit('register', address.toLowerCase());
                console.log('🪪 Registered on connect:', address.toLowerCase());
            }
        };

        socket.on('connect', handleConnect);

        return () => {
            socket.off('connect', handleConnect);
        };
    }, [address]);




    useEffect(() => {
        const handleReceiveMessage = (data: Message) => {
            const { from, message, time } = data
            console.log(from, message, time);

            console.log("📥 Message received:", data);
            setMessages((prev) => [...prev, data]);
        };

        const handleError = (msg: string) => {
            alert(msg);
        };

        socket.on('receive-message', handleReceiveMessage);
        socket.on('error-message', handleError);

        return () => {
            socket.off('receive-message', handleReceiveMessage);
            socket.off('error-message', handleError);
        };
    }, []);


    useEffect(() => {
        const fetchChatRequests = async () => {
            if (!address) return;

            try {
                const res = await axios.post("/api/chatrequests",
                    { walletAddress: address },
                );

                const data = res.data;
                setchatRequests(data.chatRequests || []);
            } catch (err) {
                console.error("❌ Failed to fetch chat requests", err);
            }
        };

        if (isConnected) {
            fetchChatRequests();
        }
    }, [isConnected, address]);

    useEffect(() => {
        const fetchAcceptedChatRequests = async () => {
            if (!address) return;

            try {
                const res = await axios.post("/api/acceptedrequests", { from: address });
                const data = res.data;
                console.log("✅ Accepted contacts fetched:", data);
                setacceptedRequests(data.AcceptedchatRequests || []); // ← fix this line
            } catch (err) {
                console.error("❌ Failed to fetch accepted requests", err);
            }
        };
        fetchAcceptedChatRequests()
    }, [isConnected, address]);





    const handleMessageSend = () => {
        if (!messageInput.trim() || !address || !recipient?.address) return;

        const now = new Date();
        const Time = now.toLocaleTimeString([], {
            hour: 'numeric', minute: '2-digit'
        });

        const newMessage: Message = {
            from: address,
            message: messageInput,
            time: Time
        };

        socket.emit('send-message', {
            to: recipient.address.toLowerCase(),
            from: address.toLowerCase(),
            message: messageInput,
            time: Time
        });

        setMessages((prev) => [...prev, newMessage]);
        setMessageInput('');
    };


    const sendChatrequest = (e: any) => {
        e.preventDefault();

        const toAddress = walletAddress.trim().toLowerCase();


        if ((toAddress !== address) && address && toAddress) {
            socket.emit("send-chat-request", {
                from: address.toLowerCase(),
                to: toAddress
            });

            toast.success(`Chat Request sent to ${toAddress}`);
            setshowContactform(false);
        }
    };



    // const onfileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const files = e.target.files;
    //     if (!files || files.length === 0) return;


    //     console.log(files);

    // }



    return (
        <div className="w-screen h-screen flex bg-background bg-[url('/assets/images/element.png')] bg-cover bg-center bg-no-repeat relative">
            <div className="bg-gray-900/5 backdrop-blur-sm w-full h-full flex">

                <ul className="flex flex-col gap-2 absolute left-1/2 -translate-1/2 top-10 z-4000">
                    {chatRequests.map((req, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                            <span className="text-white font-mono text-md">{req}</span>
                            <button
                                onClick={() => {
                                    if (!address) return;
                                    socket.emit("accept-chat-request", {
                                        from: req.toLowerCase(),
                                        to: address.toLowerCase()
                                    });

                                    // Remove from UI immediately (optional UX)
                                    setchatRequests(prev => prev.filter(r => r !== req));

                                    // Optional toast
                                    toast.success(`Accepted chat from ${req}`);
                                }}
                                className="bg-green-600 hover:bg-green-700 px-2 py-1 rounded text-xs"
                            >
                                Accept
                            </button>
                        </li>
                    ))}
                </ul>


                {
                    showContactform && (
                        <div className="w-full h-full fixed inset-0 bg-background/40 backdrop-blur-sm z-50 flex justify-center items-center">
                            <form
                                action=""
                                className="max-w-md w-full bg-background p-8 rounded-2xl shadow-xl border border-gray-800 space-y-6"
                            >
                                <div className="flex flex-col">
                                    <label
                                        htmlFor="walletAddress"
                                        className="text-gray-200 font-semibold text-sm mb-2"
                                    >
                                        Wallet Address
                                    </label>
                                    <input
                                        required
                                        onChange={(e) => {
                                            setwalletAddress(e.target.value)
                                        }}
                                        type="text"
                                        id="walletAddress"
                                        className="px-4 py-2 rounded-md bg-gray-900 border border-gray-600 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 transition duration-200"
                                        placeholder="Enter wallet address"
                                    />
                                </div>

                                <button
                                    onClick={sendChatrequest}
                                    type="submit"
                                    className="w-full cursor-pointer bg-violet-800 hover:bg-violet-900 text-white py-2 px-4 rounded-md font-medium transition duration-200"
                                >
                                    Send Chat Request
                                </button>
                                <button
                                    onClick={() => {
                                        setshowContactform(false)
                                    }}
                                    type="button"
                                    className="w-full cursor-pointer bg-violet-800 hover:bg-violet-900 text-white py-2 px-4 rounded-md font-medium transition duration-200"
                                >
                                    Cancel
                                </button>
                            </form>
                        </div>
                    )
                }



                {/* Sidebar */}
                <div className="w-[20%] border-r border-white/10 p-4 flex flex-col justify-between">
                    <div>
                        <h1 className="font-heading text-white text-2xl font-medium capitalize">
                            Zy<span className="text-logo">nc</span>
                        </h1>

                        <div className="flex items-center gap-2 mt-10 mb-4">
                            <img src="/assets/icons/contacts.svg" alt="" className="w-4 lg:w-6 xl:w-8" />
                            <h2 className="text-white font-medium text-sm lg:text-lg xl:text-xl">Contacts</h2>
                        </div>

                        <div className="flex flex-col gap-4 overflow-y-auto max-h-[calc(100vh-220px)] pr-1">
                            {/* <button className="flex items-center gap-4 cursor-pointer" onClick={() => {

                            }}>
                                <div className="w-8 h-8 lg:w-12 lg:h-12 overflow-hidden rounded-full">
                                    <img
                                        className="w-full h-full object-cover"
                                        src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapercave.com%2Fwp%2Fwp14715632.jpg&f=1"
                                        alt="Contact"
                                    />
                                </div>
                                {acceptedRequests.map((contact, i) => (
                                    <h2 key={i} className="text-xs text-white font-heading font-semibold lg:text-lg">
                                        {contact}
                                    </h2>
                                ))}

                            </button> */}
                            {acceptedRequests.map((contact, i) => (
                                <button key={i} onClick={() => setRecipient(contact)} className="flex items-center gap-4 cursor-pointer">
                                    <div className="w-8 h-8 lg:w-12 lg:h-12 overflow-hidden rounded-full">
                                        <img
                                            className="w-full h-full object-cover"
                                            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapercave.com%2Fwp%2Fwp14715632.jpg&f=1"
                                            alt="Contact"
                                        />
                                    </div>
                                    <h2 className="text-xs text-white font-heading font-semibold lg:text-lg">
                                        {contact.address.slice(0, 6)}...{contact.address.slice(-4)}
                                    </h2>
                                </button>
                            ))}

                        </div>
                    </div>

                    <div className="mt-4 pt-4 ">
                        <button className="flex items-center gap-2 mb-2 cursor-pointer transition-all duration-500 hover:bg-purple-900 hover:duration-500 w-full p-4 rounded-2xl" onClick={() => setshowContactform(!showContactform)}>
                            <img src="/assets/icons/add.svg" alt="" className="w-4 lg:w-6 xl:w-8" />
                            <h3 className="text-white font-medium text-sm capitalize lg:text-lg">add Contact</h3>
                        </button>
                        <div className="flex items-center gap-2 mb-2 border-t border-white/10 pt-4">
                            <img src="/assets/icons/profile.svg" alt="" className="w-4 lg:w-6 xl:w-8" />
                            <button className="text-white font-medium text-sm capitalize lg:text-lg">
                                <Link href="/profile">Profile</Link>
                            </button>
                        </div>
                        <div className="flex items-center justify-between mt-7">
                            <div className="flex gap-4 items-center">
                                <div className="w-9 h-9 lg:w-12 lg:h-12 overflow-hidden rounded-full">
                                    <img
                                        className="w-full h-full object-cover"
                                        src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapercave.com%2Fwp%2Fwp14715632.jpg&f=1"
                                        alt="Your Profile"
                                    />
                                </div>
                                <h2 className="text-sm text-white font-heading font-semibold lg:text-lg">You</h2>
                            </div>
                            <button className="rounded-full w-10 h-10 bg-red-700 flex items-center justify-center cursor-pointer" onClick={() => {
                                disconnect()
                                Router.refresh()
                            }}>
                                <img src="/assets/icons/logout.svg" alt="" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Chat Area */}
                <div className="w-[80%] relative p-4 text-white">
                    {/* Chat Messages */}
                    <div className="h-[90%] overflow-y-auto pr-2 space-y-4">
                        <p className="mb-2">Welcome to Zync chat!</p>

                        {messages.map((msg, idx) => {
                            const isSender = msg.from === address;
                            return (
                                <div
                                    key={idx}
                                    className={`flex ${isSender ? 'justify-end' : 'justify-start'} px-2`}
                                >
                                    <div className="bg-logo/30 p-3 rounded-md max-w-[70%] break-words">
                                        <div className="flex flex-col gap-1">
                                            <h4 className="font-heading font-bold text-blue-400">
                                                {isSender ? 'You' : msg.from}
                                            </h4>
                                            <p className="font-body text-white text-sm">{msg.message}</p>
                                            <span className="font-body text-subtext text-xs text-right">{msg.time}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Message Input */}
                    <div className="absolute bottom-5 left-4 right-4">
                        <div className="relative w-full">
                            <EmojiPicker onSelect={(emoji) => setMessageInput(prev => prev + emoji.native)} />


                            <input
                                value={messageInput}
                                onChange={(e) => setMessageInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleMessageSend()}
                                type="text"
                                placeholder="Type your message"
                                className="w-full p-3 pr-24 pl-12 rounded-md bg-white/10 text-white font-body text-sm outline-none placeholder:text-white/50"
                            />

                            {/* Attach Button */}
                            <label
                                htmlFor="fileUpload"
                                className="absolute right-14 top-1/2 -translate-y-1/2 cursor-pointer"
                            >
                            <img src="/assets/icons/attach.svg" alt="Attach" className="w-5 h-5" />
                                <input type="file" id="fileUpload" hidden  />
                           
     
                            </label> 


                            {/* <div className="absolute right-14 top-1/2 -translate-y-1/2 cursor-pointer">
                    <UploadButton
  endpoint="imageUploader"
  appearance={{
    button: " text-white px-3 py-1 rounded hover:bg-violet-800 text-sm",
    label: "hidden",
  }}
  content={{
    button: <img src="/assets/icons/attach.svg" className="w-5 h-5" />
  }}
  onClientUploadComplete={()=>{

  }}
  onUploadError={()=>{
    
  }}
/>

                            </div> */}






                            {/* Send Button */}
                            <button
                                onClick={handleMessageSend}
                                className="absolute right-4 top-1/2 -translate-y-1/2"
                            >
                                <img src="/assets/icons/send.svg" alt="Send" className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
