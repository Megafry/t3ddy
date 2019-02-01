<?php
namespace ArminVieweg\T3ddy\Ajax;

/*  | This extension is part of the TYPO3 project. The TYPO3 project is
 *  | free software and is licensed under GNU General Public License.
 *  |
 *  | (c) 2015 Patrick Crausaz <info@frontal.ch>
 *  |     2014-2017 Armin Ruediger Vieweg <armin@v.ieweg.de>
 */

use Psr\Http\Message\ServerRequestInterface;
use TYPO3\CMS\Core\Http\Response;
use \TYPO3\CMS\Core\Utility\GeneralUtility;
use TYPO3\CMS\Backend\Routing\UriBuilder;

/**
 * Class LinkBuilder
 *
 * @package ArminVieweg\T3ddy
 * @TODO status response hardcoded
 */
class LinkBuilder
{
    /**
     * Builds the link to create a new t3ddy item
     *
     * @param ServerRequestInterface $request
     * @param Response $response
     * @return Response
     * @throws \TYPO3\CMS\Backend\Routing\Exception\RouteNotFoundException
     */
    public function createNewItemLink(ServerRequestInterface $request, Response $response) : Response
    {
        /** @var UriBuilder $uriBuilder */
        $uriBuilder = GeneralUtility::makeInstance(UriBuilder::class);

        $parameters = GeneralUtility::_GPmerged('t3ddy');
        $pid = (int) $parameters['pid'];
        $colPos = $parameters['colPos'];
        $lastItemId = (int) $parameters['lastItemId'];
        $sys_language_uid = $parameters['sys_language_uid'];
        $tx_gridelements_container = $parameters['tx_gridelements_container'];
        $tx_gridelements_columns = $parameters['tx_gridelements_columns'];

        if ($lastItemId === 0) {
            // No t3ddy-items yet
            // create first t3ddy-item within current grid
            $lastItemId = $pid;
        } else {
            // create new t3ddy-item after this ContentElement ID
            $lastItemId = '-' . $lastItemId;
        }

        // generate return URL
        $returnUrl = urlencode($uriBuilder->buildUriFromModule('web_layout', ['id' => $pid])); // TODO
        $urlParams = [
            'edit[tt_content][' . $lastItemId . ']' => 'new',
            'defVals[tt_content][colPos]' => $colPos,
            'defVals[tt_content][sys_language_uid]' => $sys_language_uid,
            'defVals[tt_content][CType]' => 'gridelements_pi1',
            'defVals[tt_content][tx_gridelements_backend_layout]' => 't3ddy-item',
            'defVals[tt_content][tx_gridelements_container]' => $tx_gridelements_container,
            'defVals[tt_content][tx_gridelements_columns]' => $tx_gridelements_columns,
            'returnUrl' => $returnUrl
        ];
        $link = $uriBuilder->buildUriFromRoute('record_edit', $urlParams);
        $uri = $link->getPath() . '?' . $link->getQuery();

        $response->getBody()->write(json_encode(['status' => 'ok', 'link' => $uri]));
        return $response;
    }
}
