<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name')->nullable();
            $table->string('slug')->unique()->nullable();
            $table->integer('categories_id')->unsigned();
            $table->foreign('categories_id')->references('id')->on('categories')->onDelete('cascade');
            $table->integer('producer_id')->unsigned();
            $table->foreign('producer_id')->references('id')->on('producers')->onDelete('cascade');
            $table->integer('amount')->nullable();
            $table->longtext('image')->nullable();
            $table->integer('price_input')->nullable();
            $table->integer('promotion_price')->nullable();
            $table->boolean('status')->default(0);
            $table->mediumText('description')->nullable();
            $table->timestamps();
            $table->softDeletes()->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
}
