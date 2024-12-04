// import { NextResponse } from "next/server";
// import { prisma } from "@/lib/db";
// import { uploadImageToStorage } from "@/lib/storage"; // Your image upload logic

// export async function POST(req: Request, { params }: { params: { id: string } }) {
//   const { id } = params;
//   const formData = await req.formData();
//   const imageFile = formData.get("image");

//   if (!imageFile || !(imageFile instanceof Blob)) {
//     return NextResponse.json({ error: "Invalid image file" }, { status: 400 });
//   }

//   try {
//     const imageUrl = await uploadImageToStorage(imageFile); // Your image storage logic
//     await prisma.user.update({
//       where: { id },
//       data: { image: imageUrl },
//     });
//     return NextResponse.json({ imageUrl });
//   } catch (err) {
//     console.error("Error uploading image:", err);
//     return NextResponse.json({ error: "Failed to upload image" }, { status: 500 });
//   }
// }
