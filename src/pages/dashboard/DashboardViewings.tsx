import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Plus, Calendar, Clock, MapPin, User, CheckCircle, XCircle, Edit } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock viewing data
const mockViewings = [
  {
    id: '1',
    propertyTitle: 'Modern Downtown Apartment',
    propertyAddress: '123 Main St, Downtown',
    clientName: 'John Smith',
    clientPhone: '+1 (555) 123-4567',
    clientEmail: 'john.smith@email.com',
    scheduledDate: '2024-01-20',
    scheduledTime: '14:00',
    status: 'scheduled',
    notes: 'Client is interested in the balcony view and parking options.',
    createdAt: '2024-01-15T10:30:00Z',
  },
  {
    id: '2',
    propertyTitle: 'Luxury Villa with Garden',
    propertyAddress: '456 Oak Avenue, Suburbs',
    clientName: 'Sarah Johnson',
    clientPhone: '+1 (555) 987-6543',
    clientEmail: 'sarah.j@email.com',
    scheduledDate: '2024-01-18',
    scheduledTime: '10:30',
    status: 'completed',
    notes: 'Client loved the property. Very interested in making an offer.',
    createdAt: '2024-01-14T14:20:00Z',
  },
  {
    id: '3',
    propertyTitle: 'Cozy Family Home',
    propertyAddress: '789 Pine Street, Residential',
    clientName: 'Mike Wilson',
    clientPhone: '+1 (555) 456-7890',
    clientEmail: 'mike.wilson@email.com',
    scheduledDate: '2024-01-17',
    scheduledTime: '16:00',
    status: 'no-show',
    notes: 'Client did not show up. Attempted to call but no response.',
    createdAt: '2024-01-13T09:15:00Z',
  },
  {
    id: '4',
    propertyTitle: 'Modern Downtown Apartment',
    propertyAddress: '123 Main St, Downtown',
    clientName: 'Emily Davis',
    clientPhone: '+1 (555) 234-5678',
    clientEmail: 'emily.davis@email.com',
    scheduledDate: '2024-01-22',
    scheduledTime: '11:00',
    status: 'scheduled',
    notes: 'First-time buyer, needs guidance on the process.',
    createdAt: '2024-01-16T16:45:00Z',
  },
];

const DashboardViewings = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedViewing, setSelectedViewing] = useState<any>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // Mock filtered viewings based on search
  const filteredViewings = mockViewings.filter(viewing =>
    viewing.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    viewing.propertyTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    viewing.propertyAddress.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleScheduleViewing = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Connect to backend API
    // const formData = new FormData(e.target);
    // await fetch('/api/viewings', { method: 'POST', body: formData });
    console.log('Schedule new viewing');
    setIsAddDialogOpen(false);
    toast({
      title: "Viewing Scheduled",
      description: "The viewing has been scheduled successfully.",
    });
  };

  const handleUpdateViewingStatus = (viewingId: string, status: string, notes?: string) => {
    // TODO: Connect to backend API
    // await fetch(`/api/viewings/${viewingId}`, { 
    //   method: 'PATCH', 
    //   body: JSON.stringify({ status, notes }) 
    // });
    console.log('Update viewing status:', viewingId, status);
    toast({
      title: "Viewing Updated",
      description: `Viewing status updated to ${status}.`,
    });
  };

  const handleEditViewing = (viewing: any) => {
    setSelectedViewing(viewing);
    setIsEditDialogOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'scheduled':
        return <Badge variant="default">Scheduled</Badge>;
      case 'completed':
        return <Badge variant="secondary">Completed</Badge>;
      case 'no-show':
        return <Badge variant="destructive">No Show</Badge>;
      case 'cancelled':
        return <Badge variant="outline">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatDateTime = (date: string, time: string) => {
    const dateObj = new Date(`${date}T${time}`);
    return dateObj.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getUpcomingViewings = () => {
    const today = new Date();
    return mockViewings.filter(viewing => {
      const viewingDate = new Date(`${viewing.scheduledDate}T${viewing.scheduledTime}`);
      return viewingDate >= today && viewing.status === 'scheduled';
    }).length;
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Viewings Management</h1>
            <p className="text-muted-foreground">Schedule and manage property viewings</p>
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Schedule Viewing
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Schedule New Viewing</DialogTitle>
                <DialogDescription>
                  Schedule a property viewing for a client.
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleScheduleViewing} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="property">Property</Label>
                    <Select name="property">
                      <SelectTrigger>
                        <SelectValue placeholder="Select property" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Modern Downtown Apartment</SelectItem>
                        <SelectItem value="2">Luxury Villa with Garden</SelectItem>
                        <SelectItem value="3">Cozy Family Home</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="client">Client</Label>
                    <Select name="client">
                      <SelectTrigger>
                        <SelectValue placeholder="Select client" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">John Smith</SelectItem>
                        <SelectItem value="2">Sarah Johnson</SelectItem>
                        <SelectItem value="3">Mike Wilson</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">Date</Label>
                    <Input id="date" name="date" type="date" required />
                  </div>
                  <div>
                    <Label htmlFor="time">Time</Label>
                    <Input id="time" name="time" type="time" required />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea id="notes" name="notes" rows={3} placeholder="Any special notes or requirements..." />
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Schedule Viewing</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Viewings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{getUpcomingViewings()}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockViewings.filter(v => v.status === 'completed').length}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">No Shows</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockViewings.filter(v => v.status === 'no-show').length}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Viewings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockViewings.length}</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Viewings</CardTitle>
            <CardDescription>
              View and manage all scheduled viewings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search viewings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Property</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredViewings.map((viewing) => (
                  <TableRow key={viewing.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{viewing.propertyTitle}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {viewing.propertyAddress}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {viewing.clientName}
                        </div>
                        <div className="text-sm text-muted-foreground">{viewing.clientPhone}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span className="text-sm">
                          {formatDateTime(viewing.scheduledDate, viewing.scheduledTime)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(viewing.status)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleEditViewing(viewing)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        {viewing.status === 'scheduled' && (
                          <>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleUpdateViewingStatus(viewing.id, 'completed')}
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleUpdateViewingStatus(viewing.id, 'no-show')}
                            >
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Viewing</DialogTitle>
              <DialogDescription>
                Update viewing details and status
              </DialogDescription>
            </DialogHeader>
            
            {selectedViewing && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit-property">Property</Label>
                    <Input 
                      id="edit-property" 
                      value={selectedViewing.propertyTitle} 
                      readOnly 
                      className="bg-muted"
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-client">Client</Label>
                    <Input 
                      id="edit-client" 
                      value={selectedViewing.clientName} 
                      readOnly 
                      className="bg-muted"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit-date">Date</Label>
                    <Input 
                      id="edit-date" 
                      type="date" 
                      defaultValue={selectedViewing.scheduledDate} 
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-time">Time</Label>
                    <Input 
                      id="edit-time" 
                      type="time" 
                      defaultValue={selectedViewing.scheduledTime} 
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="edit-status">Status</Label>
                  <Select defaultValue={selectedViewing.status}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="no-show">No Show</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="edit-notes">Notes</Label>
                  <Textarea 
                    id="edit-notes" 
                    defaultValue={selectedViewing.notes}
                    rows={4}
                  />
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => {
                    handleUpdateViewingStatus(selectedViewing.id, 'updated');
                    setIsEditDialogOpen(false);
                  }}>
                    Update Viewing
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default DashboardViewings;