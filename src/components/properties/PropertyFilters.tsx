import { useState } from 'react';
import { usePropertyStore } from '@/stores/propertyStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, Search } from 'lucide-react';

const amenitiesList = [
  'Parking', 'Gym', 'Pool', 'Balcony', 'Garden', 'Garage', 
  'Pet Friendly', 'Laundry', 'Fireplace', 'Walk-in Closet',
  'Rooftop Deck', 'Basement'
];

export const PropertyFilters = () => {
  const { filters, setFilters, resetFilters } = usePropertyStore();
  const [isOpen, setIsOpen] = useState(false);

  const handlePriceRangeChange = (value: number[]) => {
    setFilters({ priceRange: [value[0], value[1]] });
  };

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    const newAmenities = checked
      ? [...filters.amenities, amenity]
      : filters.amenities.filter(a => a !== amenity);
    setFilters({ amenities: newAmenities });
  };

  return (
    <Card className="mb-6">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Property Filters
              </span>
              <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </CardTitle>
          </CardHeader>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="City or Address"
                  value={filters.location}
                  onChange={(e) => setFilters({ location: e.target.value })}
                />
              </div>

              {/* Type */}
              <div className="space-y-2">
                <Label>Property Type</Label>
                <Select value={filters.type} onValueChange={(value: any) => setFilters({ type: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="sale">For Sale</SelectItem>
                    <SelectItem value="rent">For Rent</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Bedrooms */}
              <div className="space-y-2">
                <Label>Min Bedrooms</Label>
                <Select 
                  value={filters.bedrooms?.toString() || 'any'} 
                  onValueChange={(value) => setFilters({ bedrooms: value === 'any' ? null : parseInt(value) })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any</SelectItem>
                    <SelectItem value="1">1+</SelectItem>
                    <SelectItem value="2">2+</SelectItem>
                    <SelectItem value="3">3+</SelectItem>
                    <SelectItem value="4">4+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Bathrooms */}
              <div className="space-y-2">
                <Label>Min Bathrooms</Label>
                <Select 
                  value={filters.bathrooms?.toString() || 'any'} 
                  onValueChange={(value) => setFilters({ bathrooms: value === 'any' ? null : parseInt(value) })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any</SelectItem>
                    <SelectItem value="1">1+</SelectItem>
                    <SelectItem value="2">2+</SelectItem>
                    <SelectItem value="3">3+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Price Range */}
            <div className="space-y-4">
              <Label>Price Range: ${filters.priceRange[0].toLocaleString()} - ${filters.priceRange[1].toLocaleString()}</Label>
              <Slider
                value={filters.priceRange}
                onValueChange={handlePriceRangeChange}
                max={2000000}
                step={10000}
                className="w-full"
              />
            </div>

            {/* Area Range */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="minArea">Min Area (sq ft)</Label>
                <Input
                  id="minArea"
                  type="number"
                  placeholder="Min"
                  value={filters.minArea || ''}
                  onChange={(e) => setFilters({ minArea: e.target.value ? parseInt(e.target.value) : null })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxArea">Max Area (sq ft)</Label>
                <Input
                  id="maxArea"
                  type="number"
                  placeholder="Max"
                  value={filters.maxArea || ''}
                  onChange={(e) => setFilters({ maxArea: e.target.value ? parseInt(e.target.value) : null })}
                />
              </div>
            </div>

            {/* Amenities */}
            <div className="space-y-3">
              <Label>Amenities</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {amenitiesList.map((amenity) => (
                  <div key={amenity} className="flex items-center space-x-2">
                    <Checkbox
                      id={amenity}
                      checked={filters.amenities.includes(amenity)}
                      onCheckedChange={(checked) => handleAmenityChange(amenity, checked as boolean)}
                    />
                    <Label htmlFor={amenity} className="text-sm font-normal">
                      {amenity}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={resetFilters}>
                Reset Filters
              </Button>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};