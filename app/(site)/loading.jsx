export default function Loading() {
  return (
    <div className="min-h-[100vh] flex items-center justify-center">
      <div
        className="w-9 h-9 rounded-full border-2 animate-spin"
        style={{ borderColor: 'rgba(255,255,255,0.1)', borderTopColor: '#e73103' }}
      />
    </div>
  )
}
