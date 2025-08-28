import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

interface Request {
  id: string;
  name: string;
  phone: string;
  email?: string;
  comment?: string;
  createdAt?: { seconds: number; nanoseconds: number };
}

export default function Admin() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "requests"));
        const data: Request[] = querySnapshot.docs.map((doc) => {
          const d = doc.data() as any;
          return {
            id: doc.id,
            name: d.name,
            phone: d.phone,
            email: d.email,
            comment: d.comment || d.message || "",
            createdAt: d.createdAt,
          };
        });
        setRequests(data);
      } catch (error) {
        console.error("Ошибка загрузки заявок:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  if (loading) {
    return <p className="text-center mt-10 text-gray-600">Загрузка заявок...</p>;
  }

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">📋 Заявки клиентов</h1>
      {requests.length === 0 ? (
        <p className="text-gray-500 text-center">Заявок пока нет.</p>
      ) : (
        <div className="space-y-6">
          {requests.map((req) => (
            <div
              key={req.id}
              className="p-6 border border-gray-200 rounded-xl shadow-sm bg-white hover:shadow-md transition duration-200"
            >
              <div className="flex justify-between items-start mb-3">
                <h2 className="text-lg font-semibold text-gray-900">{req.name}</h2>
                {req.createdAt && (
                  <span className="text-sm text-gray-500">
                    {new Date(req.createdAt.seconds * 1000).toLocaleString()}
                  </span>
                )}
              </div>
              <div className="space-y-1 text-gray-700">
                <p>
                  <span className="font-medium">📞 Телефон:</span>{" "}
                  <a href={`tel:${req.phone}`} className="text-sky-600 hover:underline">
                    {req.phone}
                  </a>
                </p>
                {req.email && (
                  <p>
                    <span className="font-medium">✉️ Email:</span>{" "}
                    <a href={`mailto:${req.email}`} className="text-sky-600 hover:underline">
                      {req.email}
                    </a>
                  </p>
                )}
                {req.comment && (
                  <p className="mt-2">
                    <span className="font-medium">💬 Комментарий:</span> {req.comment}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
