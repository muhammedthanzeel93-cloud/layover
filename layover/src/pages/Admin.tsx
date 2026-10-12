import { useState, useEffect } from 'react'
import { LayoutDashboard, Map, Settings, Users, Plane, LogOut, Plus, Edit, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'

// Curated initial destinations
const initialDestinations = [
  { id: 1, name: 'Dubai (DXB)', experiences: 12, active: true },
  { id: 2, name: 'Qatar / Doha (DOH)', experiences: 8, active: true },
  { id: 3, name: 'Calicut / Kozhikode (CCJ)', experiences: 6, active: true },
  { id: 4, name: 'Trivandrum / Thiruvananthapuram (TRV)', experiences: 7, active: true },
  { id: 5, name: 'Singapore (SIN)', experiences: 9, active: true },
  { id: 6, name: 'London (LHR)', experiences: 15, active: true },
]

export default function Admin() {
  const [activeTab, setActiveTab] = useState('destinations')
  const [destinations, setDestinations] = useState(initialDestinations)
  
  // Example of using local storage for persistence on the client side
  useEffect(() => {
    const saved = localStorage.getItem('layover_destinations')
    if (saved) {
      setDestinations(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('layover_destinations', JSON.stringify(destinations))
  }, [destinations])

  const addDestination = () => {
    const name = prompt('Enter new destination name (e.g. Paris (CDG)):')
    if (name) {
      setDestinations([...destinations, { id: Date.now(), name, experiences: 0, active: true }])
    }
  }

  const toggleStatus = (id: number) => {
    setDestinations(destinations.map(d => 
      d.id === id ? { ...d, active: !d.active } : d
    ))
  }

  const deleteDestination = (id: number) => {
    if (confirm('Are you sure you want to delete this destination?')) {
      setDestinations(destinations.filter(d => d.id !== id))
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 flex text-slate-50 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-950 border-r border-slate-800 flex flex-col hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-slate-800">
          <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center mr-3">
            <Plane className="w-5 h-5 text-slate-900" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-amber-500 to-amber-300 bg-clip-text text-transparent">
            Admin Panel
          </span>
        </div>
        
        <div className="flex-1 py-6 px-4 space-y-2">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'dashboard' ? 'bg-amber-500/10 text-amber-500' : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'}`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="font-medium">Dashboard</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('destinations')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'destinations' ? 'bg-amber-500/10 text-amber-500' : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'}`}
          >
            <Map className="w-5 h-5" />
            <span className="font-medium">Destinations</span>
          </button>

          <button 
            onClick={() => setActiveTab('users')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'users' ? 'bg-amber-500/10 text-amber-500' : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'}`}
          >
            <Users className="w-5 h-5" />
            <span className="font-medium">Users</span>
          </button>

          <button 
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'settings' ? 'bg-amber-500/10 text-amber-500' : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'}`}
          >
            <Settings className="w-5 h-5" />
            <span className="font-medium">Settings</span>
          </button>
        </div>

        <div className="p-4 border-t border-slate-800">
          <Link to="/" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-900 hover:text-slate-200 transition-colors">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Back to Site</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <header className="h-16 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-8 sticky top-0 z-10">
          <h1 className="text-xl font-semibold capitalize">{activeTab}</h1>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-slate-800 rounded-full border border-slate-700 flex items-center justify-center">
              <span className="text-sm font-medium">A</span>
            </div>
          </div>
        </header>

        <div className="flex-1 p-8 overflow-y-auto">
          {activeTab === 'dashboard' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                <div className="text-slate-400 text-sm font-medium mb-2">Total Bookings</div>
                <div className="text-3xl font-bold text-white">1,284</div>
                <div className="text-emerald-500 text-sm mt-2 flex items-center gap-1">+12% this week</div>
              </div>
              <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                <div className="text-slate-400 text-sm font-medium mb-2">Active Destinations</div>
                <div className="text-3xl font-bold text-white">{destinations.filter(d => d.active).length}</div>
                <div className="text-emerald-500 text-sm mt-2 flex items-center gap-1">Growing steadily</div>
              </div>
              <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                <div className="text-slate-400 text-sm font-medium mb-2">Revenue (30d)</div>
                <div className="text-3xl font-bold text-white">$45,200</div>
                <div className="text-emerald-500 text-sm mt-2 flex items-center gap-1">+8.4% this month</div>
              </div>
            </div>
          )}

          {activeTab === 'destinations' && (
            <div className="bg-slate-800/30 rounded-2xl border border-slate-800 overflow-hidden">
              <div className="p-6 border-b border-slate-800 flex justify-between items-center">
                <h2 className="text-lg font-semibold">Manage Destinations</h2>
                <button 
                  onClick={addDestination}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-900 px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add New
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-900/50 text-slate-400 text-sm">
                    <tr>
                      <th className="px-6 py-4 font-medium">Destination Name</th>
                      <th className="px-6 py-4 font-medium">Experiences</th>
                      <th className="px-6 py-4 font-medium">Status</th>
                      <th className="px-6 py-4 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {destinations.map((dest) => (
                      <tr key={dest.id} className="hover:bg-slate-800/20 transition-colors">
                        <td className="px-6 py-4 font-medium text-white">{dest.name}</td>
                        <td className="px-6 py-4 text-slate-300">{dest.experiences} tours</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${dest.active ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-slate-800 text-slate-400 border border-slate-700'}`}>
                            {dest.active ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="px-6 py-4 flex justify-end gap-3">
                          <button 
                            onClick={() => toggleStatus(dest.id)}
                            className="text-slate-400 hover:text-white transition-colors"
                            title="Toggle Status"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => deleteDestination(dest.id)}
                            className="text-slate-400 hover:text-red-400 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    
                    {destinations.length === 0 && (
                      <tr>
                        <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                          No destinations found. Add one to get started.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {(activeTab === 'users' || activeTab === 'settings') && (
            <div className="flex flex-col items-center justify-center py-20 text-slate-500">
              <Settings className="w-16 h-16 mb-4 opacity-20" />
              <h2 className="text-xl font-medium mb-2">Module Not Enabled</h2>
              <p>This module requires a backend database connection to function.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
