'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    console.log('Validation error: Email and password are required');
    redirect('/error');
  }

  const data = { email, password };
  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    console.log('error', error)

    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/admin/dashboard')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
        console.log('error', error)

    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/admin/dashboard')
}