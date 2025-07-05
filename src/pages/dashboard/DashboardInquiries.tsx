import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Search, Eye, MessageSquare, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock inquiry data
const mockInquiries = [
  {
    id: '1',
    clientName: 'John Smith',
    clientEmail: 'john.smith@email.com',
    clientPhone: '+1 (555) 123-4567',
    propertyTitle: 'Modern Downtown Apartment',
    propertyId: '1',
    message: 'I am interested in scheduling a viewing for this property. Are there any available slots next week?',
    status: 'new',
    createdAt: '2024-01-15T10:30:00Z',
    respondedAt: null,
  },
  {
    id: '2',
    clientName: 'Sarah Johnson',
    clientEmail: 'sarah.j@email.com',
    clientPhone: '+1 (555) 987-6543',
    propertyTitle: 'Luxury Villa with Garden',
    propertyId: '2',
    message: 'Hello, I would like more information about the financing options for this property.',
    status: 'responded',
    createdAt: '2024-01-14T14:20:00Z',
    respondedAt: '2024-01-14T16:45:00Z',
  },
  {
    id: '3',
    clientName: 'Mike Wilson',
    clientEmail: 'mike.wilson@email.com',
    clientPhone: '+1 (555) 456-7890',
    propertyTitle: 'Cozy Family Home',
    propertyId: '3',
    message: 'Is this property still available? I am looking to move in by next month.',
    status: 'new',
    createdAt: '2024-01-13T09:15:00Z',
    respondedAt: null,
  },
];

const DashboardInquiries = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState<any>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

  // Mock filtered inquiries based on search
  const filteredInquiries = mockInquiries.filter(inquiry =>
    inquiry.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inquiry.propertyTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inquiry.clientEmail.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewInquiry = (inquiry: any) => {
    setSelectedInquiry(inquiry);
    setIsDetailDialogOpen(true);
  };

  const handleRespondToInquiry = (inquiryId: string) => {
    // TODO: Connect to backend API
    // await fetch(`/api/inquiries/${inquiryId}/respond`, { method: 'PATCH' });
    console.log('Respond to inquiry:', inquiryId);
    toast({
      title: "Response Sent",
      description: "Your response has been sent to the client.",
    });
  };

  const handleScheduleViewing = (inquiryId: string) => {
    // TODO: Connect to backend API and redirect to viewing scheduler
    console.log('Schedule viewing for inquiry:', inquiryId);
    toast({
      title: "Viewing Scheduled",
      description: "A viewing has been scheduled for this inquiry.",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <Badge variant="destructive">New</Badge>;
      case 'responded':
        return <Badge variant="secondary">Responded</Badge>;
      case 'scheduled':
        return <Badge variant="default">Viewing Scheduled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Client Inquiries</h1>
          <p className="text-muted-foreground">Manage inquiries from potential clients</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">New Inquiries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockInquiries.filter(i => i.status === 'new').length}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Responded</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockInquiries.filter(i => i.status === 'responded').length}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Inquiries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockInquiries.length}</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Inquiries</CardTitle>
            <CardDescription>
              View and respond to client inquiries
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search inquiries..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Property</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInquiries.map((inquiry) => (
                  <TableRow key={inquiry.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{inquiry.clientName}</div>
                        <div className="text-sm text-muted-foreground">{inquiry.clientEmail}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{inquiry.propertyTitle}</div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(inquiry.status)}
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>Received: {formatDate(inquiry.createdAt)}</div>
                        {inquiry.respondedAt && (
                          <div className="text-muted-foreground">
                            Responded: {formatDate(inquiry.respondedAt)}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleViewInquiry(inquiry)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleRespondToInquiry(inquiry.id)}
                        >
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleScheduleViewing(inquiry.id)}
                        >
                          <Calendar className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Inquiry Details</DialogTitle>
              <DialogDescription>
                View and respond to client inquiry
              </DialogDescription>
            </DialogHeader>
            
            {selectedInquiry && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Client Information</h4>
                    <div className="space-y-1 text-sm">
                      <div><strong>Name:</strong> {selectedInquiry.clientName}</div>
                      <div><strong>Email:</strong> {selectedInquiry.clientEmail}</div>
                      <div><strong>Phone:</strong> {selectedInquiry.clientPhone}</div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Property</h4>
                    <div className="space-y-1 text-sm">
                      <div><strong>Title:</strong> {selectedInquiry.propertyTitle}</div>
                      <div><strong>Status:</strong> {getStatusBadge(selectedInquiry.status)}</div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Message</h4>
                  <div className="p-3 bg-muted rounded-md text-sm">
                    {selectedInquiry.message}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Response</h4>
                  <Textarea 
                    placeholder="Type your response here..."
                    rows={4}
                  />
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsDetailDialogOpen(false)}>
                    Close
                  </Button>
                  <Button onClick={() => handleScheduleViewing(selectedInquiry.id)}>
                    Schedule Viewing
                  </Button>
                  <Button onClick={() => handleRespondToInquiry(selectedInquiry.id)}>
                    Send Response
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

export default DashboardInquiries;