import { useEffect } from "react";
import toast from "react-hot-toast";

import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";
import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
	try {
		const { socket } = useSocketContext();
		if (!socket) {
			throw new Error("Socket context is not provided.");
		}
		const { messages, setMessages } = useConversation();

		useEffect(() => {
			socket?.on("newMessage", (newMessage) => {
				newMessage.shouldShake = true;
				const sound = new Audio(notificationSound);
				sound.play();
				setMessages([...messages, newMessage]);
			});

			return () => socket?.off("newMessage");
		}, [socket, setMessages, messages]);

	} catch (e) {
		toast.error(e.message);
	}
};
export default useListenMessages;