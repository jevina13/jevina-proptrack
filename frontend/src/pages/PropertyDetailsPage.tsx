import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePropertyStore } from '@/stores/propertyStore';
import { Layout } from '@/components/layout/Layout';
import { ImageGallery } from '@/components/properties/ImageGallery';
import { InquiryForm } from '@/components/properties/InquiryForm';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, MapPin, Home, Calendar } from 'lucide-react';

const PropertyDetailsPage = () => {
  const { id } = useParams();
  const { selectedProperty, inquiries, loading, error, fetchProperty, clearSelectedProperty } = usePropertyStore();

  useEffect(() => {
    if (id) {
      fetchProperty(id);
    }
    return () => clearSelectedProperty();
  }, [id, fetchProperty, clearSelectedProperty]);

  if (loading) {
    return (
      <Layout>
        <div className="space-y-6">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-96 w-full rounded-lg" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-48 w-full" />
            </div>
            <div>
              <Skeleton className="h-64 w-full" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !selectedProperty) {
    return (
      <Layout>
        <Alert variant="destructive">
          <AlertDescription>
            {'Error fetching property :' || selectedProperty}
            {error || 'Property not found'}
          </AlertDescription>
        </Alert>
      </Layout>
    );
  }

  const property = selectedProperty;
  const formatPrice = (price: number, type: string) => {
    const formatted = price.toLocaleString();
    return type === 'rent' ? `$${formatted}/month` : `$${formatted}`;
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" asChild>
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Properties
            </Link>
          </Button>
        </div>

        <ImageGallery images={property.images} title={property.title} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Property Header */}
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold">{property.title}</h1>
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>
                      {property.location.address}, {property.location.city}, {property.location.state} {property.location.zipCode}
                    </span>
                  </div>
                </div>
                <Badge variant={property.type === 'sale' ? 'default' : 'secondary'} className="text-base px-3 py-1">
                  {property.type === 'sale' ? 'For Sale' : 'For Rent'}
                </Badge>
              </div>
              
              <div className="text-4xl font-bold text-primary">
                {formatPrice(property.price, property.type)}
              </div>
              
              <div className="flex items-center space-x-6 text-lg">
                <div className="flex items-center">
                  <Home className="h-5 w-5 mr-2" />
                  {property.bedrooms} Bedrooms
                </div>
                <div>{property.bathrooms} Bathrooms</div>
                <div>{property.area.toLocaleString()} sq ft</div>
              </div>
            </div>

            <Separator />

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>About This Property</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {property.description}
                </p>
              </CardContent>
            </Card>

            {/* Amenities */}
            {property.amenities.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Amenities & Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {property.amenities.map((amenity) => (
                      <div key={amenity} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Map Placeholder */}
            <Card>
              <CardHeader>
                <CardTitle>Location</CardTitle>
                <CardDescription>
                  {property.location.address}, {property.location.city}, {property.location.state}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted rounded-lg h-64 flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <MapPin className="h-8 w-8 mx-auto mb-2" />
                    <p>Interactive Map Placeholder</p>
                    <p className="text-sm">
                      {/* TODO: Integrate Google Maps or similar mapping service */}
                      Coordinates: {property.location.coordinates?.lat}, {property.location.coordinates?.lng}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Property Details */}
            <Card>
              <CardHeader>
                <CardTitle>Property Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Property Type:</span>
                      <span className="font-medium capitalize">{property.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Bedrooms:</span>
                      <span className="font-medium">{property.bedrooms}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Bathrooms:</span>
                      <span className="font-medium">{property.bathrooms}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Area:</span>
                      <span className="font-medium">{property.area.toLocaleString()} sq ft</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status:</span>
                      <span className="font-medium capitalize">{property.status}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Listed:</span>
                      <span className="font-medium">
                        {new Date(property.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Inquiries */}
            <Card>
              <CardHeader>
                <CardTitle>Inquiries</CardTitle>
              </CardHeader>
              <CardContent>
                {inquiries.length > 0 ? (
                  <div className="space-y-4">
                    {inquiries.map((inquiry) => (
                      <div key={inquiry._id} className="border rounded p-3">
                        <p className="text-sm text-muted-foreground">
                          <strong>Message:</strong> {inquiry.message}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          <strong>Status:</strong> {inquiry.status}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          <strong>Created At:</strong> {new Date(inquiry.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No inquiries for this property yet.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <InquiryForm propertyId={property.id} propertyTitle={property.title} />
            
            {/* Agent Info Placeholder */}
            <Card>
              <CardHeader>
                <CardTitle>Your Agent</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-semibold">AT</span>
                  </div>
                  <div>
                    <p className="font-medium">Alex Thompson</p>
                    <p className="text-sm text-muted-foreground">Licensed Real Estate Agent</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Phone:</span>
                    <span>+1 (555) 234-5678</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email:</span>
                    <span>alex.thompson@proptrack.com</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Viewing
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PropertyDetailsPage;