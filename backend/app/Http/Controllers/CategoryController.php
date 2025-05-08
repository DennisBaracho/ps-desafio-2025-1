<?php

namespace App\Http\Controllers;

use App\Models\Category;
// use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class CategoryController extends Controller
{

    private $categories;

    public function __construct(Category $category)
    {
        $this->categories = $category;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $categories = $this->categories->with('vehicles')->get();
        return response()->json($categories, Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCategoryRequest $request): JsonResponse
    {
        $data = $request->validated();
        $category = $this->categories->create($data);
        return response()->json($category, Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show($id): JsonResponse
    {
        $category = $this->categories->with('vehicles')->findOrFail($id);
        return response()->json($category, Response::HTTP_OK);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategoryRequest $request, Category $category, $id): JsonResponse
    {
        $category = $this->categories->findOrFail($id);
        $data = $request->validated();
        $category->update($data);
        return response()->json($category, Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $category = $this->categories->findOrFail($id);
        $category->delete();
        return response()->json(['message' => 'Categoria deletada com sucesso']);
    }
}