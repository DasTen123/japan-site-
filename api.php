<?php
// Japan Travel Guide - PHP API

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// Get the action parameter
$action = isset($_GET['action']) ? $_GET['action'] : 'getData';

// Path to JSON data file
$dataFile = __DIR__ . '/data/japan_data.json';

// Check if file exists
if (!file_exists($dataFile)) {
    http_response_code(500);
    echo json_encode(['error' => 'Data file not found']);
    exit;
}

// Read and decode JSON data
$jsonData = file_get_contents($dataFile);
$data = json_decode($jsonData, true);

if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(500);
    echo json_encode(['error' => 'Invalid JSON data']);
    exit;
}

// Handle different actions
switch ($action) {
    case 'getData':
        // Return all data
        echo json_encode($data);
        break;
    
    case 'getRestaurants':
        echo json_encode(['restaurants' => $data['restaurants']]);
        break;
    
    case 'getAttractions':
        echo json_encode(['attractions' => $data['attractions']]);
        break;
    
    case 'getHotels':
        echo json_encode(['hotels' => $data['hotels']]);
        break;
    
    case 'getPhrases':
        echo json_encode(['phrases' => $data['phrases']]);
        break;
    
    case 'getEmergency':
        echo json_encode(['emergency' => $data['emergency']]);
        break;
    
    case 'getTips':
        echo json_encode(['tips' => $data['tips']]);
        break;
    
    default:
        http_response_code(400);
        echo json_encode(['error' => 'Invalid action']);
        break;
}
?>
