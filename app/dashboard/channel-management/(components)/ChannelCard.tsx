// import { Edit2, Trash2, Clock, Globe } from "lucide-react";

// export const ChannelCard = ({ channel, onEdit, onDelete }: any) => {
//   return (
//     <div className="flex items-center justify-between p-4 rounded-2xl border border-slate-200 bg-white hover:shadow-md transition">
//       <div className="flex items-center gap-4 flex-1">
//         <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-3xl text-white shadow-lg">
//           {channel.thumbnail}
//         </div>

//         <div className="flex-1">
//           <div className="flex items-center gap-2">
//             <h3 className="text-lg font-semibold">{channel.name}</h3>
//             <span className="px-2 py-0.5 text-xs rounded-full bg-indigo-100 text-indigo-700">
//               {channel.ageRating}
//             </span>
//             <span
//               className={`px-2 py-0.5 text-xs rounded-full ${
//                 channel.status === "active"
//                   ? "bg-emerald-100 text-emerald-700"
//                   : "bg-slate-100 text-slate-600"
//               }`}
//             >
//               {channel.status}
//             </span>
//           </div>

//           <p className="text-sm text-slate-600">{channel.description}</p>

//           <div className="flex items-center gap-4 text-xs text-slate-500 mt-2">
//             <span>📁 {channel.category}</span>
//             <span className="flex items-center gap-1">
//               <Clock size={12} />
//               {channel.broadcastType === "24/7"
//                 ? "24/7"
//                 : `${channel.scheduleHours.start} - ${channel.scheduleHours.end}`}
//             </span>
//             <span className="flex items-center gap-1">
//               <Globe size={12} />
//               {channel.timezone}
//             </span>
//           </div>
//         </div>
//       </div>

//       <div className="flex items-center gap-2">
//         <button
//           onClick={onEdit}
//           className="p-2 rounded-lg hover:bg-indigo-50 text-indigo-600"
//         >
//           <Edit2 size={18} />
//         </button>
//         <button
//           onClick={onDelete}
//           className="p-2 rounded-lg hover:bg-red-50 text-red-600"
//         >
//           <Trash2 size={18} />
//         </button>
//       </div>
//     </div>
//   );
// };
