-- CreateEnum
CREATE TYPE "Role" AS ENUM ('buyer', 'seller', 'admin');

-- CreateEnum
CREATE TYPE "Tier" AS ENUM ('Starter', 'Ascent', 'Elite', 'Titanium');

-- CreateEnum
CREATE TYPE "ProductTier" AS ENUM ('Elite', 'Ascent', 'Titanium');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('Pending', 'Paid', 'Shipped', 'Delivered', 'Completed', 'Cancelled');

-- CreateEnum
CREATE TYPE "BadgeTone" AS ENUM ('hot', 'new', 'best');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "walletAddress" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "fullName" TEXT,
    "email" TEXT,
    "country" TEXT,
    "telegram" TEXT,
    "twitter" TEXT,
    "bio" TEXT,
    "photoUrl" TEXT,
    "termsAccepted" BOOLEAN NOT NULL DEFAULT false,
    "verificationCompletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "seller_profiles" (
    "sellerId" TEXT NOT NULL,
    "storeName" TEXT,
    "storeDescription" TEXT,
    "storeWebsite" TEXT,
    "businessCategory" TEXT,
    "yearsExperience" TEXT,
    "sellerCategories" JSONB,
    "trustScore" INTEGER NOT NULL DEFAULT 0,
    "currentTier" "Tier" NOT NULL DEFAULT 'Starter',
    "memberSince" TEXT,
    "responseTime" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "seller_profiles_pkey" PRIMARY KEY ("sellerId")
);

-- CreateTable
CREATE TABLE "buyer_profiles" (
    "buyerId" TEXT NOT NULL,
    "occupation" TEXT,
    "interests" TEXT,
    "website" TEXT,
    "discord" TEXT,
    "linkedin" TEXT,
    "whyJoin" TEXT,
    "preferredCategories" JSONB,
    "trustScore" INTEGER NOT NULL DEFAULT 0,
    "currentTier" "Tier" NOT NULL DEFAULT 'Starter',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "buyer_profiles_pkey" PRIMARY KEY ("buyerId")
);

-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "subtitle" TEXT,
    "sellerId" TEXT NOT NULL,
    "tier" "ProductTier" NOT NULL,
    "score" INTEGER,
    "price" DECIMAL(10,2) NOT NULL,
    "oldPrice" DECIMAL(10,2),
    "image" TEXT,
    "gallery" JSONB,
    "category" TEXT,
    "subcategory" TEXT,
    "inStock" INTEGER NOT NULL DEFAULT 0,
    "description" JSONB,
    "features" JSONB,
    "specs" JSONB,
    "rating" DECIMAL(3,2),
    "reviews" INTEGER NOT NULL DEFAULT 0,
    "badgeLabel" TEXT,
    "badgeTone" "BadgeTone",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "buyerId" TEXT NOT NULL,
    "sellerId" TEXT NOT NULL,
    "productId" INTEGER,
    "productSlug" TEXT,
    "productName" TEXT,
    "productSubtitle" TEXT,
    "image" TEXT,
    "status" "OrderStatus" NOT NULL DEFAULT 'Pending',
    "amount" DECIMAL(10,2) NOT NULL,
    "items" INTEGER NOT NULL DEFAULT 1,
    "orderedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fulfillmentLabel" TEXT,
    "fulfillmentValue" TEXT,
    "metaLabel" TEXT,
    "metaValue" TEXT,
    "paymentChip" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wishlist" (
    "id" TEXT NOT NULL,
    "buyerId" TEXT NOT NULL,
    "productId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "wishlist_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_walletAddress_key" ON "users"("walletAddress");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "products_slug_key" ON "products"("slug");

-- CreateIndex
CREATE INDEX "products_sellerId_idx" ON "products"("sellerId");

-- CreateIndex
CREATE INDEX "products_category_idx" ON "products"("category");

-- CreateIndex
CREATE INDEX "orders_buyerId_idx" ON "orders"("buyerId");

-- CreateIndex
CREATE INDEX "orders_sellerId_idx" ON "orders"("sellerId");

-- CreateIndex
CREATE INDEX "orders_status_idx" ON "orders"("status");

-- CreateIndex
CREATE INDEX "wishlist_buyerId_idx" ON "wishlist"("buyerId");

-- CreateIndex
CREATE UNIQUE INDEX "wishlist_buyerId_productId_key" ON "wishlist"("buyerId", "productId");

-- AddForeignKey
ALTER TABLE "seller_profiles" ADD CONSTRAINT "seller_profiles_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "buyer_profiles" ADD CONSTRAINT "buyer_profiles_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;
