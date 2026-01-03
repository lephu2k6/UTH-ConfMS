import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Send, Lock, ArrowLeft, ShieldCheck, User } from "lucide-react";
import api from "../../../lib/axios";
import { useAuthStore } from "../../../app/store/useAuthStore";
import { toast } from "react-hot-toast";

export default function InternalDiscussion() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuthStore();
    const scrollRef = useRef(null);

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMessages();
    }, [id]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const fetchMessages = async () => {
        try {
            const res = await api.get(`/submissions/${id}/discussions`);
            setMessages(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSend = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        try {
            const res = await api.post(`/submissions/${id}/discussions`, {
                content: newMessage
            });
            setMessages([...messages, res.data]);
            setNewMessage("");
        } catch (err) {
            toast.error("Lỗi gửi tin nhắn");
        }
    };

    if (loading) return <div className="p-10 text-center font-medium">Đang tải...</div>;

    return (
        <div className="flex flex-col h-[calc(100vh-140px)] bg-white rounded-3xl border shadow-sm overflow-hidden mx-auto max-w-5xl mt-4">
            <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-200 rounded-full transition">
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h2 className="font-bold text-gray-800">Thảo luận nội bộ</h2>
                        <p className="text-[10px] text-teal-600 font-bold flex items-center gap-1 uppercase">
                            <Lock size={12} /> Confidential Area
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-xs bg-amber-50 text-amber-700 px-3 py-1 rounded-full border border-amber-100">
                    <ShieldCheck size={14} /> Tác giả không thể xem
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#f8fafc]">
                {messages.length === 0 ? (
                    <div className="text-center py-20 text-gray-400 italic text-sm">Chưa có thảo luận nào cho bài viết này.</div>
                ) : (
                    messages.map((msg) => {
                        const isMe = msg.user_id === user?.id;
                        return (
                            <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                                <div className={`flex gap-2 max-w-[70%] ${isMe ? "flex-row-reverse" : ""}`}>
                                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs shrink-0 shadow-sm border border-white">
                                        {msg.user_name?.charAt(0)}
                                    </div>
                                    <div>
                                        <div className={`text-[10px] text-gray-400 mb-1 ${isMe ? "text-right" : ""}`}>
                                            {msg.user_name} • {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                        <div className={`p-3 rounded-2xl text-sm ${isMe ? "bg-blue-600 text-white rounded-tr-none shadow-md" : "bg-white border rounded-tl-none shadow-sm text-gray-700"
                                            }`}>
                                            {msg.content}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
                <div ref={scrollRef} />
            </div>

            <div className="p-4 border-t bg-white">
                <form onSubmit={handleSend} className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Nhập nội dung thảo luận..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="flex-1 bg-gray-100 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <button
                        type="submit"
                        disabled={!newMessage.trim()}
                        className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 disabled:opacity-50 transition-all shadow-lg shadow-blue-100"
                    >
                        <Send size={20} />
                    </button>
                </form>
            </div>
        </div>
    );
}