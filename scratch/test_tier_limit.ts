import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../backend/.env') });

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY!
);

async function testLimits() {
  console.log('--- Buscando usuários ---');
  const { data: profiles, error } = await supabase
    .from('user_profiles')
    .select('user_id, tier, message_credits_used')
    .limit(5);

  if (error) {
    console.error('Erro ao buscar perfis:', error);
    return;
  }

  console.table(profiles);

  if (profiles && profiles.length > 0) {
    const targetUser = profiles[0].user_id;
    console.log(`\n--- Configurando usuário ${targetUser} para limite máximo ---`);
    
    const { error: updateError } = await supabase
      .from('user_profiles')
      .update({ message_credits_used: 20, tier: 'Free' })
      .eq('user_id', targetUser);

    if (updateError) {
      console.error('Erro ao atualizar créditos:', updateError);
    } else {
      console.log('Usuário atualizado com sucesso para 20 créditos (Free).');
    }
  }
}

testLimits();
