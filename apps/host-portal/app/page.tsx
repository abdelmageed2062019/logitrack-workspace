import { Button } from "@repo/ui";

export default function Home() {
  return (
    <div className="p-8 bg-slate-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-4 text-orange-500">
        LogiTrack AI - Host Portal
      </h1>
      <p className="mb-6 text-slate-400">
        مرحباً بك في غرفة التحكم المركزية لإدارة الأساطيل.
      </p>

      <div className="flex gap-4">
        <Button variant="primary">دخول النظام</Button>
        <Button variant="danger">حالة طوارئ</Button>
      </div>
    </div>
  );
}
