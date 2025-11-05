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
            'department' => 'City General Services Office',    
            'username' => 'cgso_warehouse!',
            'password' => Hash::make('warehouse1234'),
            'configs' => $account['configs'],
            'roles' => json_encode($account['roles']),
            'status' => 'active',
        ]);

        // User::create([
        //     'department' => 'Office of the Building Official',    
        //     'username' => 'obo!',
        //     'password' => Hash::make('obo1234'),
        //     'configs' => $account['configs'],
        //     'roles' => json_encode($account['roles']),
        //     'status' => 'active',
        // ]);
    }
}
