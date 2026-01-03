import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Eye, Search, Filter,
    FileText, User, Calendar,
    ChevronRight, MoreHorizontal
} from "lucide-react";
import api from "../../../lib/axios";
import { toast } from "react-hot-toast";

export default function SubmissionManagement() {
    const navigate = useNavigate();

    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    useEffect(() => {
        fetchSubmissions();
    }, []);

    const fetchSubmissions = async () => {
        try {
            setLoading(true);
            const res = await api.get("/admin/submissions");
            setSubmissions(res.data);
        } catch (err) {
            toast.error("Không thể tải danh sách bài nộp");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const filteredSubmissions = submissions.filter(s => {
        const matchesSearch = s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            s.author_name?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "All" || s.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    if (loading) {
        return (
            <div className="flex justify-center items-center h-96">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-teal-600"></div>
            </div>
        );
    }

    return (
        <div className="p-6 space-y-6 max-w-[1600px] mx-auto">

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-extrabold text-gray-900">Quản lý bài nộp</h1>
                    <p className="text-sm text-gray-500 font-medium">
                        Hệ thống có tổng cộng <span className="text-teal-600">{submissions.length}</span> bản thảo
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Tìm theo tiêu đề hoặc tác giả..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2.5 border border-gray-200 rounded-2xl w-64 md:w-80 focus:ring-2 focus:ring-teal-500 outline-none transition-all shadow-sm"
                        />
                    </div>

                    <div className="flex items-center bg-white border border-gray-200 rounded-2xl px-3 py-2 shadow-sm">
                        <Filter size={18} className="text-gray-400 mr-2" />
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="bg-transparent text-sm font-bold text-gray-700 outline-none cursor-pointer"
                        >
                            <option value="All">Tất cả trạng thái</option>
                            <option value="Pending">Chờ duyệt (Pending)</option>
                            <option value="Under Review">Đang chấm (Under Review)</option>
                            <option value="Accepted">Chấp nhận (Accepted)</option>
                            <option value="Rejected">Từ chối (Rejected)</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="bg-white border border-gray-100 rounded-3xl shadow-xl shadow-gray-100/50 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100 text-[11px] uppercase tracking-widest text-gray-400 font-bold">
                                <th className="px-6 py-4">Thông tin bản thảo</th>
                                <th className="px-6 py-4">Chuyên mục (Track)</th>
                                <th className="px-6 py-4">Ngày gửi</th>
                                <th className="px-6 py-4">Trạng thái</th>
                                <th className="px-6 py-4 text-right">Hành động</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredSubmissions.length > 0 ? (
                                filteredSubmissions.map((s) => (
                                    <tr key={s.id} className="hover:bg-teal-50/30 transition-colors group">
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-gray-100 rounded-lg text-gray-400 group-hover:bg-teal-100 group-hover:text-teal-600 transition-colors">
                                                    <FileText size={20} />
                                                </div>
                                                <div className="max-w-xs md:max-w-md">
                                                    <p className="font-bold text-gray-800 line-clamp-1 leading-tight mb-1">
                                                        {s.title}
                                                    </p>
                                                    <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
                                                        <User size={12} /> {s.author_name}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-6 py-5">
                                            <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-tighter border border-blue-100">
                                                {s.track_name || "General"}
                                            </span>
                                        </td>

                                        <td className="px-6 py-5 text-sm text-gray-500 font-medium">
                                            <div className="flex items-center gap-1.5">
                                                <Calendar size={14} className="text-gray-300" />
                                                {new Date(s.created_at).toLocaleDateString("vi-VN")}
                                            </div>
                                        </td>

                                        <td className="px-6 py-5">
                                            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${s.status === 'Accepted' ? 'bg-green-100 text-green-700' :
                                                s.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                                                    'bg-amber-100 text-amber-700'
                                                }`}>
                                                <div className={`w-1.5 h-1.5 rounded-full ${s.status === 'Accepted' ? 'bg-green-500' :
                                                    s.status === 'Rejected' ? 'bg-red-500' : 'bg-amber-500'
                                                    }`} />
                                                {s.status}
                                            </div>
                                        </td>

                                        <td className="px-6 py-5 text-right">
                                            <button
                                                onClick={() => navigate(`/admin/submission/${s.id}`)}
                                                className="inline-flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-teal-600 transition shadow-sm hover:shadow-teal-200"
                                            >
                                                Chi tiết <ChevronRight size={14} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-20 text-center">
                                        <div className="flex flex-col items-center opacity-30">
                                            <Search size={48} className="mb-2" />
                                            <p className="font-bold">Không tìm thấy bài nộp nào khớp với yêu cầu</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="bg-gray-50/50 px-6 py-4 border-t border-gray-100 flex justify-between items-center">
                    <p className="text-xs text-gray-400 font-medium italic">
                        * Nhấn "Chi tiết" để thực hiện phân công Reviewer hoặc ra quyết định.
                    </p>
                    <div className="flex gap-2">
                    </div>
                </div>
            </div>
        </div>
    );
}