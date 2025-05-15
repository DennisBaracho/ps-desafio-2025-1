<?php

namespace App\Http\Controllers;

use App\Models\Vehicle;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreVehicleRequest;
use App\Http\Requests\UpdateVehicleRequest;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class VehicleController extends Controller
{
    // Builds an vehicle
    protected $vehicle;

    public function __construct(Vehicle $vehicle)
    {
        $this->vehicle = $vehicle;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $vehicles = $this->vehicle->with('category')->get();

        return response()->json($vehicles, Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreVehicleRequest $request): JsonResponse
    {
        $data = $request->validated();

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('vehicles', 'public');
            $data['image'] = url('storage/' . $path);
        }

        $vehicle = $this->vehicle->create($data);
        $id = $vehicle->id;
        $vehicle_category = $this->vehicle->with('category')->findOrFail($id);
        return response()->json($vehicle_category, Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show($id): JsonResponse
    {
        $vehicle = $this->vehicle->with('category')->findOrFail($id);
        return response()->json($vehicle, Response::HTTP_OK);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateVehicleRequest $request, $id): JsonResponse
    {
        $vehicle = $this->vehicle->with('category')->findOrFail($id);
        $data = $request->validated();
        if ($request->hasFile('image')) {
            try {
                $image_name = explode('vehicle/', $vehicle['imagem']);
                Storage::disk('public')->delete('vehicles/' . $image_name[1]);
            } catch (Throwable) {
            } finally {
                $path = $request->file('image')->store('vehicles', 'public');
                $data['image'] = url('storage/' . $path);
            }
        }
        $vehicle->update($data);
        return response()->json($vehicle, Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $vehicle = $this->vehicle->findOrFail($id);
        $vehicle->delete();

        return response()->json(['message' => 'Veiculo deletado com sucesso']);
    }

    public function buy($id): JsonResponse
    {

        $vehicle = $this->vehicle->findOrFail($id);
        if ($vehicle->in_stock <= 0) {
            return response()->json(['message' => 'Veículo fora de estoque.'], 400);
        }
        $vehicle->in_stock -= 1;
        $vehicle->save();
        return response()->json($vehicle->in_stock, Response::HTTP_OK);
    }

     public function filter($id): JsonResponse
    {
        $vehicles = $this->vehicle->with('category')->where('category_id', $id)->get();
        return response()->json($vehicles, Response::HTTP_OK);
    }
}