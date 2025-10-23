<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AccountSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $account = ["configs" => ["xAxis" => 10, "yAxis" => 430, "fontSize" => 20], "roles" => ['editor']];

        User::create([
            'department' => 'Character first',    
            'username' => 'cf!',
            'password' => Hash::make('cf1234'),
            'configs' => $account['configs'],
            'roles' => json_encode($account['roles']),
            'status' => 'active',
        ]);
    }
}
