import { NextResponse } from "next/server";

import Account from "@/database/account.model";
import handleError from "@/lib/handlers/error";
import { ForbiddenError, ValidationError } from "@/lib/http-errors";
import { AccountSchema, UserSchema } from "@/lib/validations";
import { dbConnect } from "@/lib/mongoose";

export async function GET() {
  try {
    await dbConnect();

    const accounts = await Account.find();

    return NextResponse.json(
      { success: true, data: accounts },
      { status: 200 }
    );
  } catch (error) {
    handleError(error, "api") as APIErrorResponse;
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();

    const validateData = AccountSchema.parse(body);

    const existingAccount = await Account.findOne({
      provider: validateData.provider,
      providerAccountId: validateData.providerAccountId,
    });

    if (existingAccount)
      throw new ForbiddenError("An Account with this provider already exists");

    const newAccount = await Account.create(validateData);

    return NextResponse.json(
      { success: true, data: newAccount },
      { status: 201 }
    );
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}
