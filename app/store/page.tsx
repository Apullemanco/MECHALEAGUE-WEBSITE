"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, Filter, Search, Tag, ArrowRight } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useMobile } from "@/hooks/use-mobile"

export default function StorePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [sortOption, setSortOption] = useState("featured")
  const isMobile = useMobile()

  // Exchange rate USD to MXN (approximate)
  const exchangeRate = 17.5

  // Filter products based on search query and category
  const filteredProducts = products
    .filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .filter((product) => categoryFilter === "all" || product.category === categoryFilter)
    .sort((a, b) => {
      if (sortOption === "price-low") return a.price - b.price
      if (sortOption === "price-high") return b.price - a.price
      if (sortOption === "newest") return new Date(b.date).getTime() - new Date(a.date).getTime()
      // Default: featured
      return b.featured ? 1 : -1
    })

  const addToCart = (productId) => {
    // Get current cart from localStorage or initialize empty array
    const currentCart = JSON.parse(localStorage.getItem("cart") || "[]")

    // Check if product already exists in cart
    const existingProductIndex = currentCart.findIndex((item) => item.id === productId)

    if (existingProductIndex >= 0) {
      // Increment quantity if product already in cart
      currentCart[existingProductIndex].quantity += 1
    } else {
      // Add new product to cart
      const product = products.find((p) => p.id === productId)
      if (product) {
        currentCart.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1,
        })
      }
    }

    // Save updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(currentCart))

    // Optional: Show confirmation to user
    alert("¡Producto añadido al carrito!")
  }

  // Convert USD price to MXN
  const convertToMXN = (usdPrice) => {
    return (usdPrice * exchangeRate).toFixed(2)
  }

  return (
    <div className="flex flex-col min-h-screen max-w-[1920px] mx-auto">
      <SiteHeader />
      <main className="flex-1 w-full">
        <section className="w-full py-8 md:py-12 lg:py-16 bg-muted/30">
          <div className="container px-4 md:px-6 max-w-[1600px] mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Tienda MechaLeague</h1>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                  Mercancía oficial de MechaLeague y eventos pasados
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 mt-8">
              {!isMobile && (
                <div className="w-full md:w-64 space-y-6">
                  <div className="space-y-2">
                    <h3 className="font-medium flex items-center">
                      <Filter className="h-4 w-4 mr-2" />
                      Filtros
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium mb-2">Categoría</h4>
                        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar categoría" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Todos los Productos</SelectItem>
                            <SelectItem value="apparel">Ropa</SelectItem>
                            <SelectItem value="accessories">Accesorios</SelectItem>
                            <SelectItem value="stationery">Papelería</SelectItem>
                            <SelectItem value="collectibles">Coleccionables</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-2">Ordenar Por</h4>
                        <Select value={sortOption} onValueChange={setSortOption}>
                          <SelectTrigger>
                            <SelectValue placeholder="Ordenar por" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="featured">Destacados</SelectItem>
                            <SelectItem value="newest">Más Recientes</SelectItem>
                            <SelectItem value="price-low">Precio: Menor a Mayor</SelectItem>
                            <SelectItem value="price-high">Precio: Mayor a Menor</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium flex items-center">
                      <Tag className="h-4 w-4 mr-2" />
                      Colecciones
                    </h3>
                    <div className="space-y-1">
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-sm"
                        onClick={() => setCategoryFilter("all")}
                      >
                        Founders Championship
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-sm"
                        onClick={() => setCategoryFilter("all")}
                      >
                        Chemistry Quest
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-sm"
                        onClick={() => setCategoryFilter("all")}
                      >
                        Mercancía de Equipos
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-sm"
                        onClick={() => setCategoryFilter("all")}
                      >
                        Edición Limitada
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex-1">
                <div className="flex flex-col md:flex-row gap-4 mb-6 items-center">
                  <div className="relative w-full md:flex-1">
                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Buscar productos..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  {isMobile && (
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Categoría" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos los Productos</SelectItem>
                        <SelectItem value="apparel">Ropa</SelectItem>
                        <SelectItem value="accessories">Accesorios</SelectItem>
                        <SelectItem value="stationery">Papelería</SelectItem>
                        <SelectItem value="collectibles">Coleccionables</SelectItem>
                      </SelectContent>
                    </Select>
                  )}

                  {isMobile && (
                    <Select value={sortOption} onValueChange={setSortOption}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Ordenar por" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="featured">Destacados</SelectItem>
                        <SelectItem value="newest">Más Recientes</SelectItem>
                        <SelectItem value="price-low">Precio: Menor a Mayor</SelectItem>
                        <SelectItem value="price-high">Precio: Mayor a Menor</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                </div>

                {!isMobile && (
                  <Tabs defaultValue="all" className="mb-6" onValueChange={(value) => setCategoryFilter(value)}>
                    <TabsList>
                      <TabsTrigger value="all">Todos los Productos</TabsTrigger>
                      <TabsTrigger value="apparel">Ropa</TabsTrigger>
                      <TabsTrigger value="accessories">Accesorios</TabsTrigger>
                      <TabsTrigger value="stationery">Papelería</TabsTrigger>
                      <TabsTrigger value="collectibles">Coleccionables</TabsTrigger>
                    </TabsList>
                  </Tabs>
                )}

                {filteredProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {filteredProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={() => addToCart(product.id)}
                        convertToMXN={convertToMXN}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">
                      No se encontraron productos que coincidan con tus criterios.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}

function ProductCard({ product, onAddToCart, convertToMXN }) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md h-full flex flex-col">
      <Link href={`/store/${product.id}`} className="group">
        <div className="relative h-48 w-full bg-muted overflow-hidden">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.src = `/placeholder.svg?height=200&width=200&text=${encodeURIComponent(product.name)}`
            }}
          />
          {product.featured && <Badge className="absolute top-2 right-2 bg-primary">Destacado</Badge>}
          {product.isNew && <Badge className="absolute top-2 left-2 bg-green-500">Nuevo</Badge>}
        </div>
      </Link>
      <CardContent className="p-4 flex-1">
        <Link href={`/store/${product.id}`} className="group">
          <h3 className="font-medium text-lg group-hover:text-primary transition-colors">{product.name}</h3>
        </Link>
        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{product.description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div className="font-bold">MX${convertToMXN(product.price)}</div>
        <div className="flex gap-2">
          <Button size="sm" onClick={onAddToCart}>
            <ShoppingCart className="h-4 w-4 mr-2" />
            Añadir
          </Button>
          <Button size="sm" variant="outline" asChild>
            <Link href={`/store/${product.id}`}>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

const products = [
  {
    id: 1,
    name: "Playera MechaLeague",
    description: "Playera oficial con logo de MechaLeague en algodón premium",
    price: 24.99,
    image: "/placeholder.svg",
    category: "apparel",
    featured: true,
    isNew: false,
    date: "2023-11-15",
  },
  {
    id: 2,
    name: "Sudadera Founders Championship",
    description: "Sudadera conmemorativa del torneo inaugural de MechaLeague",
    price: 49.99,
    image: "/placeholder.svg",
    category: "apparel",
    featured: true,
    isNew: false,
    date: "2023-11-25",
  },
  {
    id: 3,
    name: "Gorra MechaLeague",
    description: "Gorra ajustable con logo bordado de MechaLeague",
    price: 19.99,
    image: "/placeholder.svg",
    category: "apparel",
    featured: false,
    isNew: true,
    date: "2024-01-10",
  },
  {
    id: 4,
    name: "Póster Equipo Vector -1",
    description: "Póster de edición limitada del equipo Vector -1",
    price: 14.99,
    image: "/placeholder.svg",
    category: "collectibles",
    featured: false,
    isNew: false,
    date: "2023-12-05",
  },
  {
    id: 5,
    name: "Cuaderno MechaLeague",
    description: "Cuaderno premium con marca MechaLeague",
    price: 12.99,
    image: "/placeholder.svg",
    category: "stationery",
    featured: false,
    isNew: true,
    date: "2024-02-15",
  },
  {
    id: 6,
    name: "Botella Chemistry Quest",
    description: "Botella de acero inoxidable con logo de Chemistry Quest",
    price: 29.99,
    image: "/placeholder.svg",
    category: "accessories",
    featured: true,
    isNew: true,
    date: "2024-03-01",
  },
  {
    id: 7,
    name: "Set de Plumas MechaLeague",
    description: "Set de 3 plumas premium con marca MechaLeague",
    price: 15.99,
    image: "/placeholder.svg",
    category: "stationery",
    featured: false,
    isNew: false,
    date: "2023-10-20",
  },
  {
    id: 8,
    name: "Colección de Pines de Equipos",
    description: "Set de pines coleccionables con todos los equipos de MechaLeague",
    price: 24.99,
    image: "/placeholder.svg",
    category: "collectibles",
    featured: false,
    isNew: false,
    date: "2023-11-30",
  },
  {
    id: 9,
    name: "Bandera MechaLeague",
    description: "Bandera oficial de MechaLeague para eventos y exhibición",
    price: 34.99,
    image: "/placeholder.svg",
    category: "accessories",
    featured: false,
    isNew: false,
    date: "2023-12-15",
  },
  {
    id: 10,
    name: "Aretes Diseño Robot",
    description: "Aretes elegantes inspirados en diseños de robots de MechaLeague",
    price: 19.99,
    image: "/placeholder.svg",
    category: "accessories",
    featured: false,
    isNew: true,
    date: "2024-02-28",
  },
  {
    id: 11,
    name: "Dije MechaLeague",
    description: "Dije metálico con logo de MechaLeague en cadena",
    price: 22.99,
    image: "/placeholder.svg",
    category: "accessories",
    featured: false,
    isNew: false,
    date: "2023-11-10",
  },
  {
    id: 12,
    name: "Póster Conmemorativo Championship",
    description: "Póster de edición limitada del Founders Championship",
    price: 17.99,
    image: "/placeholder.svg",
    category: "collectibles",
    featured: true,
    isNew: false,
    date: "2023-12-01",
  },
]
