import { useState } from 'react';
import { useDashboardStore } from '@/stores/dashboardStore';
// TODO: Use direct API call when backend is ready
import { inquiriesAPI } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface InquiryFormProps {
  propertyId: string;
  propertyTitle: string;
}

export const InquiryForm = ({ propertyId, propertyTitle }: InquiryFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: `I'm interested in learning more about "${propertyTitle}". Please contact me to discuss details and schedule a viewing.`
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { createInquiry } = useDashboardStore();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create a mock client ID for demo purposes
      const clientId = `client_${Date.now()}`;
      
      await createInquiry({
        propertyId,
        clientId,
        message: `From: ${formData.name} (${formData.email}, ${formData.phone})\n\n${formData.message}`,
        status: 'new'
      });

      toast({
        title: 'Inquiry Sent!',
        description: 'Your inquiry has been sent to the agent. They will contact you soon.',
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: `I'm interested in learning more about "${propertyTitle}". Please contact me to discuss details and schedule a viewing.`
      });

      // TODO: In a real app, this would:
      // 1. Create or find existing client by email
      // 2. Send notification to agent
      // 3. Possibly trigger automated email responses
      console.log('Inquiry submitted:', { propertyId, formData });
      
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send inquiry. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Agent</CardTitle>
        <CardDescription>
          Interested in this property? Send an inquiry to the agent.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Your full name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="your.email@example.com"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              placeholder="+1 (555) 123-4567"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="message">Message *</Label>
            <Textarea
              id="message"
              required
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
              placeholder="Tell us about your interest..."
            />
          </div>
          
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send Inquiry'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};