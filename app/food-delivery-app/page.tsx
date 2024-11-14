'use client'

import Image from 'next/image'
import { Search, ShoppingBag, Menu, Bookmark as BookmarkIcon, Clock as ClockIcon, DollarSign as DollarSignIcon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useState } from 'react'

export default function Component() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const categories = [
    { id: 'pizza', label: 'Pizza', icon: '🍕' },
    { id: 'burger', label: 'Burger', icon: '🍔' },
    { id: 'bbq', label: 'BBQ', icon: '🍖' },
    { id: 'sushi', label: 'Sushi', icon: '🍣' },
    { id: 'vegan', label: 'Vegan', icon: '🥬' },
    { id: 'desserts', label: 'Desserts', icon: '🧁' },
  ]
 

  const restaurants = [
    {
      id: 1,
      name: 'Royal Sushi House',
      image: '/sushi-1.jpg?height=40&width=60',
      time: '30-40 min',
      minSum: '$32 min sum',
      categories: ['Sushi'],
      featured: true
    },
    {
      id: 2,
      name: 'Burgers & Pizza',
      image: '/pizza-burgers.jpg?height=40&width=60',
      time: '40-60 min',
      minSum: '$24 min sum',
      categories: ['Burger', 'Pizza'],
      featured: true
    },
    {
      id: 3,
      name: 'Ninja sushi',
      image: '/ninja-sushi.jpg?height=40&width=60',
      time: '20-40 min',
      minSum: '$40 min sum',
      categories: ['Sushi'],
      featured: false
    }
  ]

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const filteredRestaurants = selectedCategories.length > 0
    ? restaurants.filter(restaurant => 
        restaurant.categories.some(cat => 
          selectedCategories.includes(cat.toLowerCase())
        )
      )
    : restaurants;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <div className="flex items-center">
                <Image 
                  src="/main.jpg"
                  alt="Food Delivery Logo"
                  width={1200}
                  height={32}
                  className="h-8 w-auto object-left object-contain"
                  priority
                />
              </div>
              <div className="relative hidden md:block">
                <Input
                  className="w-[300px] bg-gray-50"
                  placeholder="Search"
                  type="search"
                />
                <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <nav className="hidden md:flex items-center gap-6">
                <Button variant="ghost">Restaurants</Button>
                <Button variant="ghost">Deals</Button>
                <Button variant="ghost">My orders</Button>
              </nav>
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingBag className="h-5 w-5" />
                  <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs">
                    4
                  </Badge>
                </Button>
                <Image
                  src="/photo-1.jpg?height=32&width=32"
                  alt="Profile"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Promotional Banners */}
        <div className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Banner */}
            <div className="cursor-pointer transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl rounded-2xl relative overflow-hidden">
              <Image
                src="/desserts.jpg"
                alt="All Deserts Offer"
                width={600}
                height={200}
                className="w-full h-[200px] object-cover rounded-2xl"
                priority
              />
             
            </div>

            {/* Second Banner */}
            <div className="cursor-pointer transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl rounded-2xl relative overflow-hidden">
              <Image
                src="/deals.jpg"
                alt="Big Burgers Offer"
                width={600}
                height={200}
                className="w-full h-[200px] object-cover rounded-2xl"
                priority
              />
              
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-12">
          <div className="mx-auto">
            <div className="flex items-start justify-between flex-wrap">
              {categories.map((category) => (
                <div
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  className={`
                    cursor-pointer flex flex-col items-center justify-center
                    w-[160px] h-[80px] px-4 rounded-2xl
                    transition-all duration-200
                    ${selectedCategories.includes(category.id)
                      ? 'bg-[#F3F4FF] border-[#4E60FF] border-2 text-[#4E60FF]' 
                      : 'bg-blue-50/50 hover:bg-blue-50 border border-gray-100'
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{category.icon}</span>
                    <span className="text-sm font-medium">{category.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Nearby Restaurants */}
        <h2 className="text-2xl font-bold mb-6">Nearby restaurants</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredRestaurants.map((restaurant) => (
            <div 
              key={restaurant.id} 
              className="group bg-white rounded-2xl overflow-hidden border border-gray-100 cursor-pointer transition-transform duration-200 hover:scale-105 hover:shadow-lg"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={restaurant.image}
                  alt={restaurant.name}
                  fill
                  className="object-cover"
                />
                {restaurant.featured && (
                  <div className="absolute left-4 top-4">
                    <Badge className="bg-blue-600 text-white px-3 py-1">
                      FEATURED
                    </Badge>
                  </div>
                )}
                <button
                  className="absolute right-4 top-4 w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-gray-100"
                >
                  <BookmarkIcon className="h-4 w-4 text-gray-600" />
                </button>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-lg">{restaurant.name}</h3>
                  {restaurant.id === 2 && (
                    <button className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                      <ShoppingBag className="h-4 w-4 text-blue-600" />
                    </button>
                  )}
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                  <div className="flex items-center gap-1">
                    <ClockIcon className="h-4 w-4" />
                    <span>{restaurant.time}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSignIcon className="h-4 w-4" />
                    <span>{restaurant.minSum}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  {restaurant.categories.map((category) => (
                    <Badge 
                      key={category} 
                      variant="secondary" 
                      className="bg-gray-100 text-gray-600 hover:bg-gray-200"
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}